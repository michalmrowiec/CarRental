using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using Sieve.Models;

namespace CarRental.Application.Contracts
{
    public interface IRentalRepository : IBaseRepository<Rental, Guid>
    {
        Task<IList<Rental>> GetAllForVehicleAsync(Guid vehicleId);

        Task<PagedResult<Rental>> GetSortedAndFilteredProductsAsync(SieveModel sieveModel);

        Task<PagedResult<Rental>> GetSortedAndFilteredProductsAsync
            (SieveModel sieveModel, DateTime from, DateTime to);
    }
}
