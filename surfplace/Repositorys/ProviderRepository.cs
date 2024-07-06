using Models;
using System.Linq;
using UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System;

namespace Repositorys
{
    public class ProviderRepository : IProviderRepository, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private bool disposed = false;

        public ProviderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Provider Get(int id)
        {
            return _context.Provider
                .Single(x => x.Id == id);
        }

        public IQueryable<Provider> Where(Expression<Func<Provider, bool>> expression)
        {
            return _context.Provider.Where(expression)
                 .AsQueryable();
        }

        public void Active(int id)
        {
            var entity = _context.Provider.Single(x => x.Id == id);
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
            var entity = _context.Provider.Single(x => x.Id == id);
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Provider entity)
        {
            var entityBase = _context.Provider.Single(x => x.Id == entity.Id);

            entityBase.Description = entity.Description;
            _context.Entry(entityBase).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Insert(Provider entity)
        {
            _context.Provider.Add(entity);
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

        public IQueryable<Provider> GetAll()
        {
            return _context.Provider.AsQueryable();
        }
    }
}

