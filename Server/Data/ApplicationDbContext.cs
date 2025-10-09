// [[Server/Data/ApplicationDbContext.cs]]
//[[Server/Data/ApplicationDbContext.cs]]
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Location> Locations { get; set; }
        public DbSet<Mission> Missions { get; set; }
        public DbSet<MissionLocation> MissionLocations { get; set; }
        public DbSet<GpsLocationType> GpsLocationTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships (Fluent API)
            modelBuilder.Entity<Location>()
                .HasOne<GpsLocationType>()
                .WithMany()
                .HasForeignKey(l => l.GpsLocationTypeId);

            modelBuilder.Entity<Mission>()
                .HasOne<GpsLocationType>()
                .WithMany()
                .HasForeignKey(m => m.GpsLocationTypeId);
        }
    }
}
