namespace WebFPS.src.Services;

public interface IPasswordService
{
    string HashPassword(string password);

    bool VerifyPassword(string password, string hash);
}