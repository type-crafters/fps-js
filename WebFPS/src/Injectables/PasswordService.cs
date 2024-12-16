using WebFPS.src.Services;

namespace WebFPS.src.Injectables;

public class PasswordService : IPasswordService
{
    public string HashPassword(string password)
    {
        string hash = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 12);
        return hash;
    }

    public bool VerifyPassword(string password, string hash)
    {
        return BCrypt.Net.BCrypt.EnhancedVerify(password, hash);
    }
}