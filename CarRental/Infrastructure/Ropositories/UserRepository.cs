using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Infrastructure.Ropositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CarRentalContext _context;
        public UserRepository(CarRentalContext context)
        {
            _context = context;
        }

        public async Task<User?> AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
        }

        public async Task<User?> GetUserByEmailAddressAsync(string emailAddress)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.EmailAddress == emailAddress);
            return user;
        }
    }
}
