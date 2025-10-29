using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankApi.Data;
using BankApi.DTOs;
using BankApi.Helpers;
using BankApi.Services;
using BankApi.Models;

namespace BankApi.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IJwtService _jwt;
    public AuthController(AppDbContext db, IJwtService jwt) { _db = db; _jwt = jwt; }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (await _db.Users.AnyAsync(u => u.Username == dto.Username)) return BadRequest("Username taken");
        if (await _db.Users.AnyAsync(u => u.Email == dto.Email)) return BadRequest("Email taken");

        PasswordHelper.CreatePasswordHash(dto.Password, out var hash, out var salt);
        var user = new User { Username = dto.Username, Email = dto.Email, PasswordHash = hash, PasswordSalt = salt, UserType = "Normal" };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        // assign default role if exists
        var role = await _db.Roles.FirstOrDefaultAsync(r => r.RoleName == "Customer");
        if (role != null) _db.UserRoles.Add(new UserRole { UserId = user.UserId, RoleId = role.RoleId });

        await _db.SaveChangesAsync();
        return Ok(new { user.UserId, user.Username, user.Email });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _db.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
                     .FirstOrDefaultAsync(u => u.Username == dto.Username);
        if (user == null) return Unauthorized("Invalid credentials");
        if (!PasswordHelper.VerifyPassword(dto.Password, user.PasswordHash, user.PasswordSalt)) return Unauthorized("Invalid credentials");
        if (!user.IsActive) return Unauthorized("User inactive");

        var roles = user.UserRoles.Select(ur => ur.Role.RoleName);
        var token = _jwt.GenerateToken(user.UserId, user.Username, roles);

        return Ok(new { token });
    }
}
