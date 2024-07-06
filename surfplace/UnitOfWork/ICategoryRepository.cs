using Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace UnitOfWork
{
    public interface ICategoryRepository : IDisposable
    {
        Category Get(int id);
        IQueryable<Category> Where(Expression<Func<Category, bool>> expression);
        void Delete(int id);
        void Active(int id);
        void Update(Category entity);
        void Insert(Category entity);
        IQueryable<Category> GetAll();
    }
}
