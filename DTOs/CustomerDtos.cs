namespace BankApi.DTOs;
public record CustomerCreateDto(string FullName, string Email, string? Phone, DateTime? DateOfBirth);
public record CustomerUpdateDto(string FullName, string Email, string? Phone, DateTime? DateOfBirth);
