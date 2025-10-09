// [[Server/Data/SeedData.cs]]
//[[Server/Data/SeedData.cs]]
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Data;

public static class SeedData
{
    public static async Task Initialize(IServiceProvider serviceProvider)
    {
        using var context = new ApplicationDbContext(
            serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>());
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
                    new() { Name = "GasStation" },
                    new() { Name = "Pharmacy" },
                    new() { Name = "Hotel" },
                    new() { Name = "PoliceStation" },
                    new() { Name = "FireStation" },
                    new() { Name = "PostOffice" },
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
                    new() { Name = "Desert" },
                    new() { Name = "DataCore" },
                    new() { Name = "Unknown" }
                };

            context.GpsLocationTypes.AddRange(gpsLocationTypes);
            await context.SaveChangesAsync();
        }
    }
}
