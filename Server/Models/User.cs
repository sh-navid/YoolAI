namespace Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string PasswordHash { get; set; } // Consider using a secure password hashing library
        // Consider adding other user properties like email, roles, etc.
    }
}
