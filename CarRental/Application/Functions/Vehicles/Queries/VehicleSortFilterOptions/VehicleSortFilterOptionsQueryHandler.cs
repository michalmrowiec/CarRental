using CarRental.Application.Contracts;
using MediatR;

namespace CarRental.Application.Functions.Vehicles.Queries.VehicleSortFilterOptions
{
    public class VehicleSortFilterOptionsQueryHandler : IRequestHandler<VehicleSortFilterOptionsQuery, object>
    {
        private readonly IVehicleRepository _vehicleRepository;

        public VehicleSortFilterOptionsQueryHandler(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }
        public async Task<object> Handle(VehicleSortFilterOptionsQuery request, CancellationToken cancellationToken)
        {
            var vehicles = await _vehicleRepository.GetAllAsync();
            var options =
                new
                {
                    Brand = vehicles.Select(v => v.Brand).Distinct().Order().ToList(),
                    BodyType = vehicles.Select(v => v.BodyType).Distinct().ToList(),
                    Seats = vehicles.Select(v => v.Seats).Distinct().ToList(),
                    GearboxType = vehicles.Select(v => v.GearboxType).Distinct().ToList(),
                    EnginePower = vehicles.Select(v => v.EnginePower).Distinct().ToList(),
                    YearOfProduction = vehicles.Select(v => v.YearOfProduction).Distinct().ToList()
                };

            return options;
        }
    }
}
