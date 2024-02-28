using CarRental.Domain.Entities;

namespace CarRental.Application.Contracts
{
    public interface IUserRepository
    {
        Task<User?> AddUserAsync(User user);
        Task<User?> GetUserByEmailAddressAsync(string emailAddress);
    }
}
