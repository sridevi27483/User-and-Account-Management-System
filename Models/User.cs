namespace BankApi.Models;

public class User
{
    public int UserId { get; set; }                // PK
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;     // used by AuthController
    public byte[] PasswordHash { get; set; } = null!;
    public byte[] PasswordSalt { get; set; } = null!;
    public string UserType { get; set; } = "Normal";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
