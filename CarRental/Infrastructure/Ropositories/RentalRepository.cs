using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Infrastructure.Ropositories
{
    public class RentalRepository : BaseRepository<Rental, Guid, RentalRepository>, IRentalRepository
    {
        private readonly CarRentalContext _context;
        private readonly ILogger<RentalRepository> _logger;

        public RentalRepository(
            CarRentalContext context,
            ILogger<RentalRepository> logger) : base(context, logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IList<Rental>> GetAllForVehicleAsync(Guid vehicleId)
        {
            return await _context.Rentals
                .Where(r => r.VehicleId == vehicleId)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
