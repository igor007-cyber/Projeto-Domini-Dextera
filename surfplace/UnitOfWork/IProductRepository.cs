using Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace UnitOfWork
{
    public interface IProductRepository : IDisposable
    {
        Product Get(int id);
        Product Rel(int id);
        IQueryable<Product> Where(Expression<Func<Product, bool>> expression);
        void Delete(int id);
        void Active(int id);
        void Update(Product entity);
        void Insert(Product entity);
    }
}
