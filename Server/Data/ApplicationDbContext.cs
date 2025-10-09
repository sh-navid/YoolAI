// [[Server/Data/ApplicationDbContext.cs]]
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<GpsLocationType> GpsLocationTypes { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Mission> Missions { get; set; }
        public DbSet<MissionLocation> MissionLocations { get; set; }
        public DbSet<User> Users { get; set; } // Add Users DbSet

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

            modelBuilder.Entity<MissionLocation>()
                .HasKey(ml => new { ml.UserId, ml.MissionId, ml.LocationId }); // Composite key for MissionLocation
        }
    }
}
