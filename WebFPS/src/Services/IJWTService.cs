namespace WebFPS.src.Services;

public interface IJWTService {
    string SignToken(string userId, string email);
    string SignRefreshToken(string userId);
    bool IsValid(string token);
    bool IsValidRefresh(string token);
}