using Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace UnitOfWork
{
    public interface ICheckInRepository : IDisposable
    {
        CheckIn Get(int id);
        IQueryable<CheckIn> Where(Expression<Func<CheckIn, bool>> expression);
        void Delete(int id);
        void Insert(CheckIn entity);
    }
}
