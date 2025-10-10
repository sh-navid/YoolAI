using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    [Index(nameof(Username), IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }

        public required string Username { get; set; }
        
        public required string PasswordHash { get; set; } // Consider using a secure password hashing library
        // Consider adding other user properties like email, roles, etc.
    }
}
