using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class MissionLocation
    {
        public int UserId { get; set; }
        
        [ForeignKey("UserId")]
        public User? User { get; set; }

        public int MissionId { get; set; }
        
        [ForeignKey("MissionId")]
        public Mission? Mission { get; set; }

        public int LocationId { get; set; }
        
        [ForeignKey("LocationId")]
        public Location? Location { get; set; }

        public bool IsChecked { get; set; }
        
        public bool IsDone { get; set; }
    }
}
