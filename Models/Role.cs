namespace BankApi.Models;

public class Role
{
    public int RoleId { get; set; }               // PK
    public string RoleName { get; set; } = null!; // used by controllers (RoleName)
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}
