namespace WebFPS.src.RequestModels;

public class SignupRequest 
{
    public required string? Email { get; set; }
    public required string? UserName { get; set; }
    public required string? Password { get; set; }
    public required string? ConfirmPassword { get; set; }
    public bool NewsletterOptIn { get; set; }
}