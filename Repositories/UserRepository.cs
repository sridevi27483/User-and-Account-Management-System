using Microsoft.EntityFrameworkCore;
using BankApi.Data;
using BankApi.Models;

namespace BankApi.Repositories;
public class UserRepository : IUserRepository
{
    private readonly AppDbContext _db;
    public UserRepository(AppDbContext db) => _db = db;

    public async Task<User?> GetByUsernameAsync(string username) =>
        await _db.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
                       .FirstOrDefaultAsync(u => u.Username == username);

    public async Task<User?> GetByIdAsync(int id) => await _db.Users.FindAsync(id);

    public async Task AddAsync(User user) { await _db.Users.AddAsync(user); }

    public async Task SaveChangesAsync() => await _db.SaveChangesAsync();
}
