using WebFPS.src.Entities;

namespace WebFPS.src.Services;

public interface IUserRepository : IRepository<UserEntity>
{
    Task<UserEntity> FindOneByEmail(string email);
    Task<UserPreferenceEntity> FindUserPreference(string _id);
    Task<bool> AddRefreshToken(string _id, string token);
}