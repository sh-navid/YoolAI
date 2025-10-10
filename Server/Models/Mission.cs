using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Mission
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }
        
        [ForeignKey("UserId")]
        public User? User { get; set; }

        public int GpsLocationTypeId { get; set; }

        [ForeignKey("GpsLocationTypeId")]
        public GpsLocationType? GpsLocationType { get; set; }
    }
}
