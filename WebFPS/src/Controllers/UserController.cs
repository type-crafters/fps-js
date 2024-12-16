using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using WebFPS.src.Entities;
using WebFPS.src.RequestModels;
using WebFPS.src.Services;

namespace WebFPS.src.Controllers;

[ApiController]
[Route("/api/users")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepo;
    private readonly IPasswordService _passwordService;
    private readonly IJWTService _jwtService;

    public UserController(IUserRepository userRepo, IPasswordService passwordService, IJWTService jwtService)
    {
        _userRepo = userRepo;
        _passwordService = passwordService;
        _jwtService = jwtService;
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromForm] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Email?.Trim().ToLower()))
        {
            return BadRequest("Email is empty.");
        }
        if (string.IsNullOrEmpty(request.Password?.Trim()))
        {
            return BadRequest("Password is empty.");
        }

        try
        {
            UserEntity user = await _userRepo.FindOneByEmail(request.Email);
            if (user == null)
            {
                return BadRequest("This email is not linked to an account.");
            }

            bool passwordsMatch = _passwordService.VerifyPassword(request.Password, user.PasswordHash);

            if (!passwordsMatch)
            {
                return BadRequest("Passwords don't match.");
            }

            string accessToken = _jwtService.SignToken(user.Id!.ToString(), user.Email);
            string refreshToken = _jwtService.SignRefreshToken(user.Id!.ToString());

            return Ok(new {accessToken, refreshToken});
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception.Message);
            return Problem(detail: "There was an error retrieving the user from the database", statusCode: 500);
        }
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromForm] SignupRequest request)
    {
        Regex emailPattern = new(@"^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}$");
        Regex usernamePattern = new(@"^[A-Za-z_]{1}[\w]{7,30}$");

        if (string.IsNullOrEmpty(request.Email?.Trim().ToLower()))
        {
            return BadRequest("Email should not be empty.");
        }
        if (string.IsNullOrEmpty(request.UserName?.Trim()))
        {
            return BadRequest("Username should not be empty.");
        }
        if (string.IsNullOrEmpty(request.Password?.Trim()))
        {
            return BadRequest("Password should not be empty.");
        }
        if (string.IsNullOrEmpty(request.ConfirmPassword?.Trim()))
        {
            return BadRequest("Confirm password should not be empty.");
        }

        if (!emailPattern.IsMatch(request.Email))
        {
            return BadRequest("Email does not match accepted format.");
        }
        if (!usernamePattern.IsMatch(request.UserName))
        {
            return BadRequest("Username does not match accepted format.");
        }

        if (!string.Equals(request.Password, request.ConfirmPassword))
        {
            return BadRequest("Passwords do not match.");
        }

        try
        {
            UserEntity emailVerifier = await _userRepo.FindOneByEmail(request.Email);
            if (emailVerifier != null)
            {
                return BadRequest("Email is already in use.");
            }
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception.Message);
            return Problem(detail: "There was a problem running the email verification query", statusCode: 500);
        }

        bool result = await _userRepo.InsertOne(new UserEntity
        {
            Email = request.Email,
            UserName = request.UserName,
            PasswordHash = _passwordService.HashPassword(request.Password),
            NewsletterOptIn = request.NewsletterOptIn,
            IsEmailConfirmed = false,
            CreationDate = DateTime.Now
        });

        return result ? Ok("User created successfully") : Problem("There was a problem creating the user in the database.", statusCode: 500);

    }
}