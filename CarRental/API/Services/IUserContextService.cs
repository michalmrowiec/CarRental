using System.Security.Claims;

namespace CarRental.API.Services
{
    public interface IUserContextService
    {
        Guid? GetUserId { get; }
        ClaimsPrincipal? User { get; }
    }
}
