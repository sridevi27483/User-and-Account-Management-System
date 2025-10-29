namespace BankApi.Models
{
    public class Permission
    {
        public int Id { get; set; }
        public string PermissionCode { get; set; } = null!; // e.g. "customers.create"
        public string Description { get; set; } = null!;
    }
}
