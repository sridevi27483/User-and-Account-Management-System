namespace BankApi.Services;
public interface IJwtService
{
    string GenerateToken(int userId, string username, IEnumerable<string> roles);
}
