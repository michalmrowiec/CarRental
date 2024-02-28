using CarRental.Domain.Entities;

namespace CarRental.Application.Contracts
{
    public interface IVehicleRepository : IBaseRepository<Vehicle, Guid>
    {

    }
}
