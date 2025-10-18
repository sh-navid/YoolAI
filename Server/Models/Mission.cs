using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Mission
    {
        [Key]
        public int Id { get; set; }

        public int GroupId { get; set; }

        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public int GpsLocationTypeId { get; set; }

        [ForeignKey("GpsLocationTypeId")]
        public GpsLocationType? GpsLocationType { get; set; }

        // StartDateTime
        // EndDateTime
        // MissionType
        // State
        // nextMission
        // previousMission

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}



// When: Range, What, Where: GpsLocationTypes[]|Location, Who, howManyTime