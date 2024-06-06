using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using CarRental.Domain.Services.Rentals;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace CarRental.Infrastructure.Ropositories
{
    public class RentalRepository : BaseRepository<Rental, Guid, RentalRepository>, IRentalRepository
    {
        private readonly CarRentalContext _context;
        private readonly ILogger<RentalRepository> _logger;
        private readonly ISieveProcessor _sieveProcessor;

        public RentalRepository(
            CarRentalContext context,
            ILogger<RentalRepository> logger,
            ISieveProcessor sieveProcessor)
            : base(context, logger)
        {
            _context = context;
            _logger = logger;
            _sieveProcessor = sieveProcessor;
        }

        public async Task<IList<Rental>> GetAllForVehicleAsync(Guid vehicleId)
        {
            return await _context.Rentals
                .Where(r => r.VehicleId == vehicleId)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<PagedResult<Rental>> GetSortedAndFilteredProductsAsync(SieveModel sieveModel)
        {
            var rentals = _context.Rentals
                .Include(r => r.Vehicle)
                .Include(r => r.Client)
                .Include(r => r.Employee)
                .AsQueryable();

            var filteredRentals = await _sieveProcessor
                .Apply(sieveModel, rentals)
                .ToListAsync();

            var totalCount = await _sieveProcessor
                .Apply(sieveModel, rentals, applyPagination: false, applySorting: false)
                .CountAsync();

    //        try
    //        {
    //            var users = await _context.Users
    //.AsNoTracking()
    //.ToListAsync();
    //        }
    //        catch (Exception e)
    //        {
    //            Console.WriteLine(e.Message);
    //            throw;
    //        }


            //filteredRentals.ForEach(r => { r.Client = users.FirstOrDefault(u => r.ClientId.Equals(u.Id)); });

            return new PagedResult<Rental>
                (filteredRentals, totalCount, sieveModel.PageSize.Value, sieveModel.Page.Value);
        }

        public async Task<PagedResult<Rental>> GetSortedAndFilteredProductsAsync
            (SieveModel sieveModel, DateTime from, DateTime to)
        {
            var reservationService = new ReservationService(
                await _context.Rentals
                .Where(r => r.StartDate <= from && r.EndDate >= to)
                .ToListAsync());

            var rentals = _context.Rentals
                .AsQueryable();

            var filteredRentals = await _sieveProcessor
                .Apply(sieveModel, rentals)
                .ToListAsync();

            filteredRentals = reservationService.GetAllReservationBetweenDates(from, to).ToList();

            var totalCount = await _sieveProcessor
                .Apply(sieveModel, rentals, applyPagination: false, applySorting: false)
                .CountAsync();

            return new PagedResult<Rental>
                (filteredRentals, totalCount, sieveModel.PageSize.Value, sieveModel.Page.Value);
        }
    }
}
