namespace WebFPS.src.ResponseModels;

public class LoginResponse(string id, string email, string userName)
{
    public string Id { get; set; } = id;
    public string Email { get; set; } = email;
    public string UserName { get; set; } = userName;
}