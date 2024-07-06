using Models;
using System.Linq;
using UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System;

namespace Repositorys
{
    public class AspNetUsersCompanyRepository : IAspNetUsersCompanyRepository, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private bool disposed = false;

        public AspNetUsersCompanyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public AspNetUsersCompany Get(int id)
        {
            return _context.AspNetUsersCompany
                .Include(x => x.Company)
                .Include(x => x.ApplicationUser)
                .Single(x => x.Id == id);
        }

        public IQueryable<AspNetUsersCompany> Where(Expression<Func<AspNetUsersCompany, bool>> expression)
        {
            return _context.AspNetUsersCompany.Where(expression)
                .Include(x => x.Company)
                .Include(x => x.ApplicationUser)
                 .AsQueryable();
        }

        public void Delete(int id)
        {
            var entity = _context.AspNetUsersCompany.Single(x => x.Id == id);
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public void Insert(AspNetUsersCompany entity)
        {
            _context.AspNetUsersCompany.Add(entity);
            _context.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public AspNetUsersCompany GetByUser(string id)
        {
            return _context.AspNetUsersCompany
               .Single(x => x.ApplicationUserId == id);
        }
    }
}

