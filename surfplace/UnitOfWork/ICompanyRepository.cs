using Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace UnitOfWork
{
    public interface ICompanyRepository : IDisposable
    {
        Company Get(int id);
        IQueryable<Company> Where(Expression<Func<Company, bool>> expression);
        void Active(int id);
        void Delete(int id);
        void Update(Company entity);
        void Insert(Company entity);
        IQueryable<Company> GetAll();
    }
}
