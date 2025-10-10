// [[Server/Data/SeedData.cs]]
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>());
            // Ensure the database is created.
            context.Database.EnsureCreated();

            // Apply migrations. This ensures the database schema is up to date.
            if (context.Database.GetPendingMigrations().Any())
            {
                context.Database.Migrate();
            }

            // Seed GpsLocationTypes
            if (!context.GpsLocationTypes.Any())
            {
                var gpsLocationTypes = new List<GpsLocationType>
                    {
                        new() { Name = "Supermarket", DisplayName = "Supermarket" },
                        new() { Name = "Gym", DisplayName = "Gym" },
                        new() { Name = "Home", DisplayName = "Home" },
                        new() { Name = "Work", DisplayName = "Work" },
                        new() { Name = "School", DisplayName = "School" },
                        new() { Name = "Hospital", DisplayName = "Hospital" },
                        new() { Name = "Park", DisplayName = "Park" },
                        new() { Name = "Restaurant", DisplayName = "Restaurant" },
                        new() { Name = "Cafe", DisplayName = "Cafe" },
                        new() { Name = "Library", DisplayName = "Library" },
                        new() { Name = "Museum", DisplayName = "Museum" },
                        new() { Name = "Airport", DisplayName = "Airport" },
                        new() { Name = "Clinic", DisplayName = "Clinic" },
                        new() { Name = "Market", DisplayName = "Market" },
                        new() { Name = "Bank", DisplayName = "Bank" },
                        new() { Name = "Gas Station", DisplayName = "Gas Station" },
                        new() { Name = "Pharmacy", DisplayName = "Pharmacy" },
                        new() { Name = "Hotel", DisplayName = "Hotel" },
                        new() { Name = "Police Station", DisplayName = "Police Station" },
                        new() { Name = "Fire Station", DisplayName = "Fire Station" },
                        new() { Name = "Post Office", DisplayName = "Post Office" },
                        new() { Name = "Church", DisplayName = "Church" },
                        new() { Name = "Temple", DisplayName = "Temple" },
                        new() { Name = "Mosque", DisplayName = "Mosque" },
                        new() { Name = "Stadium", DisplayName = "Stadium" },
                        new() { Name = "Cinema", DisplayName = "Cinema" },
                        new() { Name = "Theater", DisplayName = "Theater" },
                        new() { Name = "Gallery", DisplayName = "Gallery" },
                        new() { Name = "Zoo", DisplayName = "Zoo" },
                        new() { Name = "Beach", DisplayName = "Beach" },
                        new() { Name = "Mountain", DisplayName = "Mountain" },
                        new() { Name = "Forest", DisplayName = "Forest" },
                        new() { Name = "River", DisplayName = "River" },
                        new() { Name = "Lake", DisplayName = "Lake" },
                        new() { Name = "Ocean", DisplayName = "Ocean" },
                        new() { Name = "Desert", DisplayName = "Desert" }
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
