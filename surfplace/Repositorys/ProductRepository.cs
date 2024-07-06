using Models;
using System.Linq;
using UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System;

namespace Repositorys
{
    public class ProductRepository : IProductRepository, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private bool disposed = false;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Product Get(int id)
        {
            return _context.Product.Include(c => c.Brand)
                .Include(c => c.Company)
                .Single(x => x.Id == id);
        }

        public Product Rel(int id)
        {
            var product = _context.Product.Include(c => c.Brand)
                .Include(c => c.Company)
                .Single(x => x.Id == id);
            product.CheckIns = _context.CheckIn.Where(x => x.ProductId == id).OrderBy(x => x.CheckInDate).ToList();
            product.CheckOuts = _context.CheckOut.Where(x => x.ProductId == id).OrderBy(x => x.CheckOutDate).ToList();
            return product;
        }

        public IQueryable<Product> Where(Expression<Func<Product, bool>> expression)
        {
            return _context.Product.Include(c => c.Brand)
                .Include(c => c.Company).Where(expression)
                 .AsQueryable();
        }

        public void Active(int id)
        {
            var entity = _context.Product.Single(x => x.Id == id);
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
            var entity = _context.Product.Single(x => x.Id == id);
            _context.Remove(entity);
            _context.SaveChanges();
        }

        public void Update(Product entity)
        {
            var entityBase = _context.Product.Single(x => x.Id == entity.Id);

            entityBase.Description = entity.Description;
            entityBase.ValueMinimum = entity.ValueMinimum;
            entityBase.Value = entity.Value;
            entityBase.BrandId = entity.BrandId;
            entityBase.Code= entity.Code;
            _context.Entry(entityBase).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Insert(Product entity)
        {
            _context.Product.Add(entity);
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

