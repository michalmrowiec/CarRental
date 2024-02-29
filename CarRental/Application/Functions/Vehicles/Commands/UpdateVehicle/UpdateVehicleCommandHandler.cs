using AutoMapper;
using CarRental.Application.Contracts;
using CarRental.Application.Functions.Vehicles.Queries.GetVehicleById;
using CarRental.Domain.Entities;
using MediatR;

namespace CarRental.Application.Functions.Vehicles.Commands.UpdateVehicle
{
    public class UpdateVehicleCommandHandler : IRequestHandler<UpdateVehicleCommand, ResponseBase<Vehicle>>
    {
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        private readonly ILogger<UpdateVehicleCommandHandler> _logger;
        public UpdateVehicleCommandHandler(IVehicleRepository vehicleRepository, IMediator mediator, IMapper mapper, ILogger<UpdateVehicleCommandHandler> logger)
        {
            _vehicleRepository = vehicleRepository;
            _mediator = mediator;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<ResponseBase<Vehicle>> Handle(UpdateVehicleCommand request, CancellationToken cancellationToken)
        {
            var vehicleResponse = await _mediator.Send(new GetVehicleByIdQuery(request.Id), cancellationToken);

            if (!vehicleResponse.Success || vehicleResponse.ReturnedObj == null)
            {
                _logger.LogWarning("Failed to update vehicle with ID: {VehicleId} - vehicle does not exist.", request.Id);
                return new ResponseBase<Vehicle>(false, "Vehicle does not exist");
            }

            UpdateVehicleValidator validator = new();
            var validationResult = validator.Validate(request);

            if (!validationResult.IsValid)
            {
                return new ResponseBase<Vehicle>(validationResult);
            }

            var vehicle = vehicleResponse.ReturnedObj;

            Vehicle updatedVehicle;

            try
            {
                var mappedVehicle = _mapper.Map(request, vehicle);
                mappedVehicle.UpdatedAt = DateTime.UtcNow;

                updatedVehicle = await _vehicleRepository.UpdateAsync(mappedVehicle);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update vehicle with ID: {VehicleId}.", vehicle.Id);
                return new ResponseBase<Vehicle>(false, "Something went wrong");
            }

            return new ResponseBase<Vehicle>(updatedVehicle);
        }
    }
}
