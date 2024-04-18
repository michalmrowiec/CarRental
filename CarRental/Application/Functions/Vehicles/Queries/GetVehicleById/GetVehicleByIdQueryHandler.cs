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
            Vehicle vehicle;
            try
            {
                vehicle = await _vehicleRepository.GetByIdAsync(request.VehicleId);
            }
            catch (Exception)
            {
                return new ResponseBase<Vehicle>(false, "Vehicle does not exist.", ResponseBase.ResponseStatus.NotFound);
            }

            return new ResponseBase<Vehicle>(vehicle);
        }
    }
}
