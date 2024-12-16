using MongoDB.Bson;

namespace WebFPS.src.Services;

public interface IRepository<T> where T : class
{
        Task<bool> InsertOne(T entity);
        Task<bool> InsertMany(List<T> entities);

        Task<long> CountDocuments();
        Task<List<T>> Find(int limit = 0, int offset = 0) ;
        Task<T> FindOne(string _id);

        Task<bool> UpdateOne(string _id, T entity);

        Task<bool> DeleteOne(string _id);
}
