using CarRental.Application.Contracts.Files;
using CarRental.Application.Functions.Vehicles.Commands.UpdateVehicle;
using CarRental.Application.Functions.Vehicles.Queries.GetVehicleById;
using CarRental.Domain.Entities;
using MediatR;

namespace CarRental.Application.Functions.Vehicles.Commands.AddImage
{
    public class AddImageCommandHandler : IRequestHandler<AddImageCommand, ResponseBase<string>>
    {
        private readonly IFileRepository _fileRepository;
        private readonly IMediator _mediator;
        public AddImageCommandHandler(IFileRepository fileRepository, IMediator mediator)
        {
            _fileRepository = fileRepository;
            _mediator = mediator;
        }

        public async Task<ResponseBase<string>> Handle(AddImageCommand request, CancellationToken cancellationToken)
        {

            var vehicleResponse = await _mediator.Send(new GetVehicleByIdQuery(request.VehicleId), cancellationToken);

            if (!vehicleResponse.Success || vehicleResponse.ReturnedObj == null)
            {
                return new ResponseBase<string>(false, "Vehicle does not exist.");
            }

            Vehicle vehicle = vehicleResponse.ReturnedObj;

            byte[] fileExist = await _fileRepository.GetFileAsync(FileType.VehicleImage, request.FileName) ?? Array.Empty<byte>();

            if (fileExist.Length != 0)
            {
                return new ResponseBase<string>(false, "A file with this name already exists.");
            }

            var filePath = await _fileRepository.SaveFileAsync(FileType.VehicleImage, request.ImageData, request.FileName) + ';';

            var updateVehicleCommand = new UpdateVehicleCommand();

            updateVehicleCommand.Id = vehicle.Id;
            updateVehicleCommand.ImageUrls = vehicle.ImageUrls == null ?
                filePath : string.Concat(vehicle.ImageUrls, filePath);

            var result = await _mediator.Send(updateVehicleCommand, cancellationToken);

            if (!result.Success || result.ReturnedObj == null)
            {
                return new ResponseBase<string>(false, "Something went wrong.");
            }

            return new ResponseBase<string>(filePath);
        }
    }
}
