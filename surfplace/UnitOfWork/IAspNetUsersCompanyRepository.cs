using Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace UnitOfWork
{
    public interface IAspNetUsersCompanyRepository : IDisposable
    {
        AspNetUsersCompany Get(int id);
        AspNetUsersCompany GetByUser(string id);
        IQueryable<AspNetUsersCompany> Where(Expression<Func<AspNetUsersCompany, bool>> expression);
        void Delete(int id);
        void Insert(AspNetUsersCompany entity);
    }
}
