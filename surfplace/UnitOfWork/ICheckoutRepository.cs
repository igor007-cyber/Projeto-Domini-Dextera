using Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace UnitOfWork
{
    public interface ICheckOutRepository : IDisposable
    {
        CheckOut Get(int id);
        IQueryable<CheckOut> Where(Expression<Func<CheckOut, bool>> expression);
        void Delete(int id);
        void Insert(CheckOut entity);
    }
}
