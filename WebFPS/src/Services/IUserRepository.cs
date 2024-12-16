using WebFPS.src.Entities;

namespace WebFPS.src.Services;

public interface IUserRepository : IRepository<UserEntity>
{
    Task<UserEntity> FindOneByEmail(string email);
    Task<bool> AddRefreshToken(string _id, string token);
}