using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using MediatR;

namespace CarRental.Application.Functions.Vehicles.Queries.GetVehicleById
{
    public class GetVehicleByIdQueryHandler : IRequestHandler<GetVehicleByIdQuery, ResponseBase<Vehicle>>
    {
        private readonly IVehicleRepository _vehicleRepository;

        public GetVehicleByIdQueryHandler(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public async Task<ResponseBase<Vehicle>> Handle(GetVehicleByIdQuery request, CancellationToken cancellationToken)
        {
            var vehicle = await _vehicleRepository.GetByIdAsync(request.VehicleId);

            if (vehicle == null)
            {
                return new ResponseBase<Vehicle>(false, "Vehicle does not exist.");
            }

            return new ResponseBase<Vehicle>(vehicle);
        }
    }
}
