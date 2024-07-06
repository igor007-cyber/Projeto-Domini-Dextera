using Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace UnitOfWork
{
    public interface IBrandRepository : IDisposable
    {
        Brand Get(int id);
        IQueryable<Brand> Where(Expression<Func<Brand, bool>> expression);
        void Delete(int id);
        void Active(int id);
        void Update(Brand entity);
        void Insert(Brand entity);
        IQueryable<Brand> GetAll();
    }
}
