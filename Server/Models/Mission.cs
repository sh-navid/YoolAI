// [[Server/Models/Mission.cs]]
//[[Server/Models/Mission.cs]]
namespace Server.Models
{
    public class Mission
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int GpsLocationTypeId { get; set; }  // Foreign key to GpsLocationType
    }
}
