// [[Server/Models/Location.cs]]
//[[Server/Models/Location.cs]]
namespace Server.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int GpsLocationTypeId { get; set; } // Foreign key to GpsLocationType
        public double Lat { get; set; }
        public double Lon { get; set; }
    }
}
