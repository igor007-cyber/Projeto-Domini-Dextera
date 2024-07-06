using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Brand>().HasKey(c => c.Id);
            modelBuilder.Entity<Provider>().HasKey(c => c.Id);
            modelBuilder.Entity<Company>().HasKey(c => c.Id);
            modelBuilder.Entity<AspNetUsersCompany>().HasKey(c => c.Id);
            modelBuilder.Entity<Category>().HasKey(c => c.Id);
            modelBuilder.Entity<Product>().HasKey(c => c.Id);
            modelBuilder.Entity<CheckIn>().HasKey(c => c.Id);
            modelBuilder.Entity<CheckOut>().HasKey(c => c.Id);

            modelBuilder.Entity<Brand>().HasOne(c => c.Company);
            modelBuilder.Entity<AspNetUsersCompany>().HasOne(c => c.Company);
            modelBuilder.Entity<AspNetUsersCompany>().HasOne(c => c.ApplicationUser);
            modelBuilder.Entity<Provider>().HasOne(c => c.Company);
            modelBuilder.Entity<Category>().HasOne(c => c.Company);
            modelBuilder.Entity<Product>().HasOne(c => c.Company);
            modelBuilder.Entity<Product>().HasOne(c => c.Brand);
            modelBuilder.Entity<CheckOut>().HasOne(c => c.Product);
            modelBuilder.Entity<CheckIn>().HasOne(c => c.Product);
            modelBuilder.Entity<CheckIn>().HasOne(c => c.Provider);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<AspNetUsersCompany> AspNetUsersCompany { get; set; }
        public DbSet<Brand> Brand { get; set; }
        public DbSet<Provider> Provider { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<CheckIn> CheckIn { get; set; }
        public DbSet<CheckOut> CheckOut { get; set; }

    }
}
