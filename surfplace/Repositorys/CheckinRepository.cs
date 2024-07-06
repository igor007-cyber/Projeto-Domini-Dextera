using Models;
using System.Linq;
using UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System;

namespace Repositorys
{
    public class CheckInRepository : ICheckInRepository, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private bool disposed = false;

        public CheckInRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public CheckIn Get(int id)
        {
            return _context.CheckIn.Include(c => c.Product).Include(c => c.Provider)
                .Single(x => x.Id == id);
        }

        public IQueryable<CheckIn> Where(Expression<Func<CheckIn, bool>> expression)
        {
            return _context.CheckIn
                .Include(c => c.Product)
                .Include(c => c.Provider)
                .Where(expression).OrderBy(c => c.CheckInDate).AsQueryable();
        }

        public void Delete(int id)
        {
            var entity = _context.CheckIn.Single(x => x.Id == id);
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public void Insert(CheckIn entity)
        {
            _context.CheckIn.Add(entity);
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

