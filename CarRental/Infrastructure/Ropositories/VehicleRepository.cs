using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using CarRental.Domain.Services.Rentals;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace CarRental.Infrastructure.Ropositories
{
    public class VehicleRepository : BaseRepository<Vehicle, Guid, VehicleRepository>, IVehicleRepository
    {
        private readonly CarRentalContext _context;
        private readonly ILogger<VehicleRepository> _logger;
        private readonly ISieveProcessor _sieveProcessor;

        public VehicleRepository(
            CarRentalContext context,
            ILogger<VehicleRepository> logger,
            ISieveProcessor sieveProcessor) : base(context, logger)
        {
            _context = context;
            _logger = logger;
            _sieveProcessor = sieveProcessor;
        }

        public async Task<PagedResult<Vehicle>> GetSortedAndFilteredProductsAsync(SieveModel sieveModel)
        {
            var vehicles = _context.Vehicles
                .AsQueryable();

            var filteredVehicles = await _sieveProcessor
                .Apply(sieveModel, vehicles)
                .ToListAsync();

            var totalCount = await _sieveProcessor
                .Apply(sieveModel, vehicles, applyPagination: false, applySorting: false)
                .CountAsync();

            return new PagedResult<Vehicle>
                (filteredVehicles, totalCount, sieveModel.PageSize.Value, sieveModel.Page.Value);
        }

        public async Task<PagedResult<Vehicle>> GetSortedAndFilteredProductsAsync
            (SieveModel sieveModel, DateTime freeFrom, DateTime freeTo)
        {
            var rentals = await _context.Rentals
                                        .AsNoTracking()
                                        .ToListAsync();

            var reservationService = new ReservationService(rentals);

            var vehicles = _context.Vehicles
                .AsQueryable();

            var filteredVehicles = await _sieveProcessor
                .Apply(sieveModel, vehicles)
                .ToListAsync();

            filteredVehicles = filteredVehicles
                .Where(v => reservationService.CheckReservationAvailability(v.Id, freeFrom, freeTo))
                .ToList();

            var totalCount = await _sieveProcessor
                .Apply(sieveModel, vehicles, applyPagination: false, applySorting: false)
                .CountAsync();

            return new PagedResult<Vehicle>
                (filteredVehicles, totalCount, sieveModel.PageSize.Value, sieveModel.Page.Value);
        }
    }
}