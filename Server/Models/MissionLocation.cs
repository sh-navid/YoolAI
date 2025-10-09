namespace Server.Models
{
    public class MissionLocation
    {
        public int UserId { get; set; }
        public int MissionId { get; set; }
        public int LocationId { get; set; }
        public bool IsChecked { get; set; }
        public bool IsDone { get; set; }
    }
}
