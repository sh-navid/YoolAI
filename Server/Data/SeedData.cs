// [[Server/Data/SeedData.cs]]
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                // Ensure the database is created.
                context.Database.EnsureCreated();

                // Apply migrations.  This ensures the database schema is up to date.
                if (context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }


                // Seed GpsLocationTypes
                if (!context.GpsLocationTypes.Any())
                {
                    var gpsLocationTypes = new List<GpsLocationType>
                    {
                        new() { Name = "Supermarket" },
                        new() { Name = "Gym" },
                        new() { Name = "Home" },
                        new() { Name = "Work" },
                        new() { Name = "School" },
                        new() { Name = "Hospital" },
                        new() { Name = "Park" },
                        new() { Name = "Restaurant" },
                        new() { Name = "Cafe" },
                        new() { Name = "Library" },
                        new() { Name = "Museum" },
                        new() { Name = "Airport" },
                        new() { Name = "Clinic" },
                        new() { Name = "Market" },
                        new() { Name = "Bank" },
                        new() { Name = "Gas Station" },
                        new() { Name = "Pharmacy" },
                        new() { Name = "Hotel" },
                        new() { Name = "Police Station" },
                        new() { Name = "Fire Station" },
                        new() { Name = "Post Office" },
                        new() { Name = "Church" },
                        new() { Name = "Temple" },
                        new() { Name = "Mosque" },
                        new() { Name = "Stadium" },
                        new() { Name = "Cinema" },
                        new() { Name = "Theater" },
                        new() { Name = "Gallery" },
                        new() { Name = "Zoo" },
                        new() { Name = "Beach" },
                        new() { Name = "Mountain" },
                        new() { Name = "Forest" },
                        new() { Name = "River" },
                        new() { Name = "Lake" },
                        new() { Name = "Ocean" },
                       new() { Name = "Desert" }

                    };

                    await context.GpsLocationTypes.AddRangeAsync(gpsLocationTypes);
                    await context.SaveChangesAsync();
                }

                // Seed a default user if there are no users.
                if (!context.Users.Any())
                {
                    context.Users.Add(new User { Username = "admin", PasswordHash = "password" }); // Replace with secure password handling
                    await context.SaveChangesAsync();
                }

            }
        }
    }
}
