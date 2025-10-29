using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankApi.Data;
using BankApi.DTOs;
using BankApi.Models;

namespace BankApi.Controllers;
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CustomersController : ControllerBase
{
    private readonly AppDbContext _db;
    public CustomersController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.Customers.ToListAsync());

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var c = await _db.Customers.FindAsync(id);
        if (c == null) return NotFound();
        return Ok(c);
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Create([FromBody] CustomerCreateDto dto)
    {
        if (await _db.Customers.AnyAsync(c => c.Email == dto.Email)) return BadRequest("Email exists");
        var c = new Customer { FullName = dto.FullName, Email = dto.Email, Phone = dto.Phone, DateOfBirth = dto.DateOfBirth };
        _db.Customers.Add(c);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = c.CustomerId }, c);
    }

    [HttpPut("{id:int}")]
    [AllowAnonymous]
    public async Task<IActionResult> Update(int id, [FromBody] CustomerUpdateDto dto)
    {
        var c = await _db.Customers.FindAsync(id);
        if (c == null) return NotFound();
        c.FullName = dto.FullName;
        c.Email = dto.Email;
        c.Phone = dto.Phone;
        c.DateOfBirth = dto.DateOfBirth;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var c = await _db.Customers.FindAsync(id);
        if (c == null) return NotFound();
        _db.Customers.Remove(c); // or set IsActive false for soft delete
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("{id:int}/deactivate")]
    [AllowAnonymous]
    public async Task<IActionResult> Deactivate(int id)
    {
        var c = await _db.Customers.FindAsync(id);
        if (c == null) return NotFound();
        c.IsActive = false;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("{id:int}/reactivate")]
    [AllowAnonymous]
    public async Task<IActionResult> Reactivate(int id)
    {
        var c = await _db.Customers.FindAsync(id);
        if (c == null) return NotFound();
        c.IsActive = true;
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
