using Models;
using System.Linq;
using UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System;

namespace Repositorys
{
    public class CategoryRepository : ICategoryRepository, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private bool disposed = false;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Category Get(int id)
        {
            return _context.Category
                .Single(x => x.Id == id);
        }

        public IQueryable<Category> Where(Expression<Func<Category, bool>> expression)
        {
            return _context.Category.Where(expression)
                 .AsQueryable();
        }

        public void Active(int id)
        {
            var entity = _context.Category.Single(x => x.Id == id);
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
            var entity = _context.Category.Single(x => x.Id == id);
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Category entity)
        {
            var entityBase = _context.Category.Single(x => x.Id == entity.Id);

            entityBase.Description = entity.Description;
            _context.Entry(entityBase).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Insert(Category entity)
        {
            _context.Category.Add(entity);
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

        public IQueryable<Category> GetAll()
        {
            return _context.Category.AsQueryable();
        }
    }
}

