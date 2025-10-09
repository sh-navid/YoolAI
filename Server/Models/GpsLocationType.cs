using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class GpsLocationType
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)] // Adjust length as needed
        [RegularExpression(@"^[a-zA-Z0-9\s]+$", ErrorMessage = "Name can only contain letters, numbers, and spaces.")]
        public required string Name { get; set; }

        // Method to validate and normalize the name; we use this to ensure uniqueness
        public bool IsValidName()
        {
            if (string.IsNullOrWhiteSpace(Name))
            {
                return false; // Or throw an exception if you prefer.
            }

            // Normalize the name.
            string normalizedName = NormalizeName(Name);


            // Check for uniqueness (assuming you have a repository or context)
            // Example (assuming you have DbContext and a DbSet<GpsLocationType> named GpsLocationTypes)
            // In reality, this check should usually go in the data access layer/repository.  This is for demonstration.
                //using (var context = new YourDbContext())
                //{
                 //   return !context.GpsLocationTypes.Any(g => NormalizeName(g.Name) == normalizedName && g.Id != this.Id); // Exclude the current object.  Crucial for updating.
                //}
              return !string.IsNullOrWhiteSpace(normalizedName);
        }

        public static string NormalizeName(string inputName)
        {
            if (string.IsNullOrWhiteSpace(inputName))
            {
                return null;
            }

            // 1. Remove leading/trailing whitespace.
            string trimmedName = inputName.Trim();

            // 2. Convert to lowercase.
            string lowerCaseName = trimmedName.ToLowerInvariant();

            // 3. Replace multiple spaces with a single space.
            while (lowerCaseName.Contains("  ")) {
                lowerCaseName = lowerCaseName.Replace("  ", " ");
            }

           return lowerCaseName; // Return normalized result.
        }
    }
}