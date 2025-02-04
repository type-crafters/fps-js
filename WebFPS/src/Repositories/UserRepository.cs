using MongoDB.Bson;
using MongoDB.Driver;
using WebFPS.src.Entities;
using WebFPS.src.Services;
using WebFPS.src.Util;

namespace WebFPS.src.Repositories;

public class UserRepository(MongoDbContext context) : IUserRepository
{
    private readonly IMongoCollection<UserEntity> _users = context.GetCollection<UserEntity>("users");
    private readonly IMongoCollection<UserPreferenceEntity> _preferences = context.GetCollection<UserPreferenceEntity>("user_preferences");
    public async Task<bool> InsertOne(UserEntity user)
    {
        try
        {
            user.Id = ObjectId.GenerateNewId().ToString();
            await _users.InsertOneAsync(user);
            await _preferences.InsertOneAsync(new UserPreferenceEntity(user.Id));
            return true;
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception.Message);
            return false;
        }
    }

    public async Task<bool> InsertMany(List<UserEntity> users)
    {
        try
        {
            List<UserPreferenceEntity> preferences = [];
            users.ForEach((user) => {
                user.Id = ObjectId.GenerateNewId().ToString();
                preferences.Add(new UserPreferenceEntity(user.Id));
            });
            await _users.InsertManyAsync(users);
            await _preferences.InsertManyAsync(preferences);
            return true;
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception.Message);
            return false;
        }
    }

    public async Task<long> CountDocuments()
    {
        return await _users.CountDocumentsAsync(Builders<UserEntity>.Filter.Empty);
    }

    public async Task<List<UserEntity>> Find(int limit = 0, int offset = 0)
    {
        FilterDefinition<UserEntity> filter = Builders<UserEntity>.Filter.Empty;
        return await _users.Find(filter).Skip(offset).Limit(limit).ToListAsync();
    }

    public async Task<UserEntity> FindOne(string _id)
    {
        FilterDefinition<UserEntity> filter = Builders<UserEntity>.Filter.Eq(user => user.Id, _id);
        return await _users.Find(filter).FirstOrDefaultAsync();
    }

    public async Task<UserEntity> FindOneByEmail(string email)
    {
        FilterDefinition<UserEntity> filter = Builders<UserEntity>.Filter.Eq(user => user.Email, email);
        return await _users.Find(filter).FirstOrDefaultAsync();
    }

    public async Task<bool> UpdateOne(string _id, UserEntity user)
    {
        FilterDefinition<UserEntity> filter = Builders<UserEntity>.Filter.Eq(user => user.Id, _id);
        ReplaceOneResult result = await _users.ReplaceOneAsync(filter, user);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> AddRefreshToken(string _id, string token)
    {
        FilterDefinition<UserEntity> filter = Builders<UserEntity>.Filter.Eq(user => user.Id, _id);
        UpdateDefinition<UserEntity> update = Builders<UserEntity>.Update.Set(user => user.RefreshToken, token);

        UpdateResult result = await _users.UpdateOneAsync(filter, update);

        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteOne(string _id)
    {
        FilterDefinition<UserEntity> filter = Builders<UserEntity>.Filter.Eq(user => user.Id, _id);
        DeleteResult result = await _users.DeleteOneAsync(filter);
        return result.DeletedCount > 0;
    }
}