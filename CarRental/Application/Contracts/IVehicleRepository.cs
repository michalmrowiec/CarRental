using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using Sieve.Models;

namespace CarRental.Application.Contracts
{
    public interface IVehicleRepository : IBaseRepository<Vehicle, Guid>
    {
        Task<PagedResult<Vehicle>> GetSortedAndFilteredProductsAsync(SieveModel sieveModel);
        Task<PagedResult<Vehicle>> GetSortedAndFilteredProductsAsync
            (SieveModel sieveModel, DateTime freeFrom, DateTime freeTo);
    }
}
