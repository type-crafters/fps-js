using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebFPS.src.Entities;

public class UserEntity 
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)] 
    public string? Id { get; set; }
    public required string Email { get; set; }
    public required string UserName { get; set;}
    public required string PasswordHash { get; set; }
    public bool IsEmailConfirmed { get; set; }
    public bool NewsletterOptIn { get; set; }
    public DateTime CreationDate { get; set; }
    public string? RefreshToken { get; set; }
}