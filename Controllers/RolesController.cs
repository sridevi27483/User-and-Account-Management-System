using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankApi.Data;
using BankApi.Models;

namespace BankApi.Controllers;
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class RolesController : ControllerBase
{
    private readonly AppDbContext _db;
    public RolesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.Roles.Include(r => r.RolePermissions).ThenInclude(rp => rp.Permission).ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Role role)
    {
        if (await _db.Roles.AnyAsync(r => r.RoleName == role.RoleName)) return BadRequest("Role exists");
        _db.Roles.Add(role);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = role.RoleId }, role);
    }

    [HttpPost("{roleId:int}/permissions/{permId:int}")]
    public async Task<IActionResult> AssignPermission(int roleId, int permId)
    {
        var exists = await _db.RolePermissions.FindAsync(roleId, permId);
        if (exists != null) return BadRequest("Already assigned");
        _db.RolePermissions.Add(new RolePermission { RoleId = roleId, PermissionId = permId });
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
