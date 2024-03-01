using CarRental.Application.Contracts;
using CarRental.Application.Contracts.Files;
using CarRental.Application.Functions.Vehicles.Queries.GetVehicleById;
using MediatR;

namespace CarRental.Application.Functions.Vehicles.Commands.DeleteVehicle
{
    public class DeleteVehicleCommandHandler : IRequestHandler<DeleteVehicleCommand, ResponseBase>
    {
        private readonly IFileRepository _fileRepository;
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IMediator _mediator;
        public DeleteVehicleCommandHandler(IFileRepository fileRepository, IMediator mediator, IVehicleRepository vehicleRepository)
        {
            _fileRepository = fileRepository;
            _mediator = mediator;
            _vehicleRepository = vehicleRepository;
        }

        public async Task<ResponseBase> Handle(DeleteVehicleCommand request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetVehicleByIdQuery(request.VehicleId), cancellationToken);

            if (!response.Success || response.ReturnedObj == null)
            {
                return new ResponseBase(false, "Vehicle does not exist.", ResponseBase.ResponseStatus.NotFound);
            }

            var vehicle = response.ReturnedObj;

            var result = await _vehicleRepository.DeleteAsync(vehicle);

            if(!result)
            {
                return new ResponseBase(false, "Something went wrong.", ResponseBase.ResponseStatus.Error);
            }

            var imagesPaths = vehicle.ImageUrls?.Split(';').ToList() ?? new();

            foreach (var path in imagesPaths)
            {
                _fileRepository.DeleteFile(path);
            }

            return new ResponseBase();
        }
    }
}
