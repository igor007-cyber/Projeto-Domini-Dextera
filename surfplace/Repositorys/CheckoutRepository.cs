using Models;
using System.Linq;
using UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System;

namespace Repositorys
{
    public class CheckOutRepository : ICheckOutRepository, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private bool disposed = false;

        public CheckOutRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public CheckOut Get(int id)
        {
            return _context.CheckOut.Include(c => c.Product)
                .Single(x => x.Id == id);
        }

        public IQueryable<CheckOut> Where(Expression<Func<CheckOut, bool>> expression)
        {
            return _context.CheckOut
                .Include(c => c.Product)
                .Where(expression)
                .OrderBy(c => c.CheckOutDate)
                .AsQueryable();
        }

        public void Delete(int id)
        {
            var entity = _context.CheckOut.Single(x => x.Id == id);
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public void Insert(CheckOut entity)
        {
            _context.CheckOut.Add(entity);
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
    }
}

