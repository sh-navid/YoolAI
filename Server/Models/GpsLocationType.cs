using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class GpsLocationType
    {
        [Key]
        public int Id { get; set; }

        private string _name;

        [Required]
        [StringLength(100)]
        [RegularExpression(@"^[a-zA-Z0-9\s]+$", ErrorMessage = "Name can only contain letters, numbers, and spaces.")]
        [Column(TypeName = "VARCHAR")]
        public required string Name
        {
            get { return _name; }
            set
            {
                _name = SanitizeName(value);
            }
        }

        private static string SanitizeName(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                return string.Empty;
            }

            string sanitized = Regex.Replace(input, @"[^a-zA-Z0-9\s]", "").ToUpperInvariant();

            return sanitized.Trim();
        }

        [Required]
        [StringLength(100)]
        public required string DisplayName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}