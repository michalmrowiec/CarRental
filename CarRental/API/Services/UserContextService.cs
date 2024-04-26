using System.Security.Claims;

namespace CarRental.API.Services
{
    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;

        public Guid? GetUserId => User?.FindFirstValue(ClaimTypes.NameIdentifier) is null ? null : Guid.Parse(User!.FindFirstValue(ClaimTypes.NameIdentifier)!);
    };
}
