using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Location
    {
        [Key]
        public int Id { get; set; }

        public required string Name { get; set; }

        // Foreign key property
        public int GpsLocationTypeId { get; set; }

        // Navigation property
        [ForeignKey("GpsLocationTypeId")]
        public GpsLocationType? GpsLocationType { get; set; }

        public required double Lat { get; set; }
        public required double Lon { get; set; }
        public double Alt { get; set; } = 0;
        public double Floor { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}