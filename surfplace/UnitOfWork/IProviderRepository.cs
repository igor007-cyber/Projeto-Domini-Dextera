using Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace UnitOfWork
{
    public interface IProviderRepository : IDisposable
    {
        Provider Get(int id);
        IQueryable<Provider> Where(Expression<Func<Provider, bool>> expression);
        void Delete(int id);
        void Active(int id);
        void Update(Provider entity);
        void Insert(Provider entity);
        IQueryable<Provider> GetAll();
    }
}
