using Models;
using System.Linq;
using UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System;

namespace Repositorys
{
    public class BrandRepository : IBrandRepository, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private bool disposed = false;

        public BrandRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Brand Get(int id)
        {
            return _context.Brand
                .Single(x => x.Id == id);
        }

        public IQueryable<Brand> Where(Expression<Func<Brand, bool>> expression)
        {
            return _context.Brand.Where(expression)
                 .AsQueryable();
        }

        public void Active(int id)
        {
            var entity = _context.Brand.Single(x => x.Id == id);
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
            var entity = _context.Brand.Single(x => x.Id == id);
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Brand entity)
        {
            var entityBase = _context.Brand.Single(x => x.Id == entity.Id);

            entityBase.Description = entity.Description;
            _context.Entry(entityBase).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Insert(Brand entity)
        {
            _context.Brand.Add(entity);
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

        public IQueryable<Brand> GetAll()
        {
            return _context.Brand.AsQueryable();
        }
    }
}

