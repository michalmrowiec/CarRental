using CarRental.Domain.Entities;

namespace CarRental.Application.Contracts
{
    public interface IRentalRepository : IBaseRepository<Rental, Guid>
    {
        Task<IList<Rental>> GetAllForVehicleAsync(Guid vehicleId);
    }
}
