using Models;
using System.Linq;
using UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System;

namespace Repositorys
{
    public class CompanyRepository : ICompanyRepository, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private bool disposed = false;

        public CompanyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Company Get(int id)
        {
            return _context.Company
                .Single(x => x.Id == id);
        }

        public IQueryable<Company> Where(Expression<Func<Company, bool>> expression)
        {
            return _context.Company.Where(expression)
                 .AsQueryable();
        }

        public void Active(int id)
        {
            var entity = _context.Company.Single(x => x.Id == id);
            if (entity.Active)
            {
                entity.Active = false;
            }
            else
            {
                entity.Active = true;
            }
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var entity = _context.Company.Single(x => x.Id == id);
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Company entity)
        {
            var entityBase = _context.Company.Single(x => x.Id == entity.Id);

            entityBase.Name = entity.Name;
            entityBase.Cnpj = entity.Cnpj;
            _context.Entry(entityBase).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Insert(Company entity)
        {
            _context.Company.Add(entity);
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

        public IQueryable<Company> GetAll()
        {
            return _context.Company.AsQueryable();
        }
    }
}

