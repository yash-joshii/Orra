using Microsoft.EntityFrameworkCore;
using Paymentapi.Models;

namespace Paymentapi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
        {
        }

        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transaction>().ToTable("transactions", t => t.ExcludeFromMigrations());
        }
    }
}
