using CarRental.Application.Contracts;
using CarRental.Application.Functions.Users.Commands.Register;
using CarRental.Application.Functions.Users.Commands;
using CarRental.Domain.Entities;
using MediatR;
using AutoMapper;

namespace CarRental.Application.Functions.Vehicles.Commands.AddVehicle
{
    public class AddVehicleCommandHandler : IRequestHandler<AddVehicleCommand, ResponseBase<Vehicle>>
    {
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IMapper _mapper;

        public AddVehicleCommandHandler(IVehicleRepository vehicleRepository, IMapper mapper)
        {
            _vehicleRepository = vehicleRepository;
            _mapper = mapper;
        }

        public async Task<ResponseBase<Vehicle>> Handle(AddVehicleCommand request, CancellationToken cancellationToken)
        {
            AddVehicleValidator validator = new();
            var validationResult = validator.Validate(request);

            if (!validationResult.IsValid)
            {
                return new ResponseBase<Vehicle>(validationResult);
            }

            var newVehicle = _mapper.Map<Vehicle>(request);
            newVehicle.CreatedAt = DateTime.Now;
            newVehicle.UpdatedAt = DateTime.Now;

            var vehicle = await _vehicleRepository.CreateAsync(newVehicle);

            return new ResponseBase<Vehicle>(vehicle);
        }
    }
}
