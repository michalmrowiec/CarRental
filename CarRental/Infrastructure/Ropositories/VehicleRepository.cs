using CarRental.Application.Contracts;
using CarRental.Domain.Entities;

namespace CarRental.Infrastructure.Ropositories
{
    public class VehicleRepository : BaseRepository<Vehicle, Guid, VehicleRepository>, IVehicleRepository
    {
        private readonly CarRentalContext _context;
        private readonly ILogger<VehicleRepository> _logger;

        public VehicleRepository(CarRentalContext context, ILogger<VehicleRepository> logger) : base(context, logger)
        {
            _context = context;
            _logger = logger;
        }
    }
}