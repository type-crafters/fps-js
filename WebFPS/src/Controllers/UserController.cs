using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using WebFPS.src.Entities;
using WebFPS.src.RequestModels;
using WebFPS.src.Services;
using WebFPS.src.ResponseModels;

namespace WebFPS.src.Controllers;

[ApiController]
[Route("api/users")]
public class UserController(IUserRepository userRepo, IPasswordService passwordService, IJWTService jwtService) : ControllerBase
{
    private readonly IUserRepository _userRepo = userRepo;
    private readonly IPasswordService _passwordService = passwordService;
    private readonly IJWTService _jwtService = jwtService;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
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

            LoginResponse userResponse = new(id: user.Id, email: user.Email, userName: user.UserName);

            Response.Cookies.Append("accessToken", accessToken, new CookieOptions
            {
                HttpOnly = true,
                // Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(1)
            });

            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                // Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(30)
            });

            return Ok(userResponse);
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception.Message);
            return Problem(detail: "There was an error retrieving the user from the database", statusCode: 500);
        }
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupRequest request)
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
    [Authorize]
    [HttpGet("{id}/preferences")]
    public async Task<IActionResult> GetUserPreferences(string id)
    {
        string token = Request.Headers.Authorization.ToString().Split(" ")[1];
        string tokenId = _jwtService.GetClaim(token, ClaimTypes.NameIdentifier);

        if (id != tokenId)
        {
            return Forbid("Requesting incorrect user information.");
        }

        await _userRepo.FindOne(_id: ""); // csharp-lint-disable:CS1998
        return Ok(); // csharp-lint-disable:CS0161
    }
}