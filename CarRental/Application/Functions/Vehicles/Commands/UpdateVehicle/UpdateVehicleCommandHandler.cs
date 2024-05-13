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
                return new ResponseBase<Vehicle>(false, "Vehicle does not exist", ResponseBase.ResponseStatus.NotFound);
            }

            UpdateVehicleValidator validator = new();
            var validationResult = validator.Validate(request);

            if (!validationResult.IsValid)
            {
                return new ResponseBase<Vehicle>(validationResult);
            }

            var vehicle = vehicleResponse.ReturnedObj;

            Vehicle updatedVehicle;

            vehicle.UpdatedAt = DateTime.UtcNow;
            vehicle.VinNumber = request.VinNumber ?? vehicle.VinNumber;
            vehicle.LicensePlate = request.LicensePlate ?? vehicle.LicensePlate;
            vehicle.Brand = request.Brand ?? vehicle.Brand;
            vehicle.Model = request.Model ?? vehicle.Model;
            vehicle.YearOfProduction = request.YearOfProduction ?? vehicle.YearOfProduction;
            vehicle.BodyType = request.BodyType ?? vehicle.BodyType;
            vehicle.FuelType = request.FuelType ?? vehicle.FuelType;
            vehicle.Color = request.Color ?? vehicle.Color;
            vehicle.Mileage = request.Mileage ?? vehicle.Mileage;
            vehicle.EngineSize = request.EngineSize ?? vehicle.EngineSize;
            vehicle.EnginePower = request.EnginePower ?? vehicle.EnginePower;
            vehicle.Torqe = request.Torqe ?? vehicle.Torqe;
            vehicle.GearboxType = request.GearboxType ?? vehicle.GearboxType;
            vehicle.Weight = request.Weight ?? vehicle.Weight;
            vehicle.NumberOfDoors = request.NumberOfDoors ?? vehicle.NumberOfDoors;
            vehicle.Seats = request.Seats ?? vehicle.Seats;
            vehicle.CarEquipment = request.CarEquipment ?? vehicle.CarEquipment;
            vehicle.IsAvailable = request.IsAvailable ?? vehicle.IsAvailable;
            vehicle.NextCarInspection = request.NextCarInspection ?? vehicle.NextCarInspection;
            vehicle.RentalNetPricePerDay = request.RentalNetPricePerDay ?? vehicle.RentalNetPricePerDay;
            vehicle.Currency = request.Currency ?? vehicle.Currency;
            vehicle.VatRate = request.VatRate ?? vehicle.VatRate;
            vehicle.ImageUrls = request.ImageUrls ?? vehicle.ImageUrls;
            vehicle.CoverImageUrl = request.CoverImageUrl ?? vehicle.CoverImageUrl;

            try
            {
                updatedVehicle = await _vehicleRepository.UpdateAsync(vehicle);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update vehicle with ID: {VehicleId}.", vehicle.Id);
                return new ResponseBase<Vehicle>(false, "Something went wrong", ResponseBase.ResponseStatus.Error);
            }

            return new ResponseBase<Vehicle>(updatedVehicle);
        }
    }
}
