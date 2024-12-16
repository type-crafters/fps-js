using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebFPS.src.Services;

namespace WebFPS.src.Injectables;

public class JWTService : IJWTService
{
    private readonly string _accessKey = Environment.GetEnvironmentVariable("ACCESS_KEY")!;
    private readonly string _refreshKey = Environment.GetEnvironmentVariable("REFRESH_KEY")!;
    private readonly string _iss = Environment.GetEnvironmentVariable("JWT_ISS")!;
    private readonly string _aud = Environment.GetEnvironmentVariable("JWT_AUD")!;
    public string SignToken(string userId, string email)
    {
        Claim[] claims = {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Role, "Player")
        };

        SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_accessKey));
        SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        JwtSecurityToken token = new JwtSecurityToken(
            issuer: _iss,
            audience: _aud,
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string SignRefreshToken(string userId)
    {
        Claim[] claims = {
            new Claim(ClaimTypes.NameIdentifier, userId),
        };

        SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_refreshKey));
        SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        JwtSecurityToken token = new JwtSecurityToken(
            issuer: _iss,
            audience: _aud,
            claims: claims,
            expires: DateTime.Now.AddDays(30),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public bool IsValid(string token)
    {
        try
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.UTF8.GetBytes(_accessKey);
            TokenValidationParameters parameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _iss,
                ValidAudience = _aud,
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };

            handler.ValidateToken(token, parameters, out var validatedToken);
            return true;

        }
        catch (SecurityTokenInvalidSignatureException)
        {
            Console.WriteLine("Token signature is invalid");
            return false;
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception.Message);
            return false;
        }
    }

    public bool IsValidRefresh(string token)
    {
        try
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.UTF8.GetBytes(_refreshKey);
            TokenValidationParameters parameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _iss,
                ValidAudience = _aud,
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };

            handler.ValidateToken(token, parameters, out var validatedToken);
            return true;

        }
        catch (SecurityTokenInvalidSignatureException)
        {
            Console.WriteLine("Token signature is invalid");
            return false;
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception.Message);
            return false;
        }
    }
}