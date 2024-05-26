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

            if (!vehicleResponse.Success || vehicleResponse.ReturnedObject == null)
            {
                return new ResponseBase<string>(false, "Vehicle does not exist.", ResponseBase.ResponseStatus.NotFound);
            }

            Vehicle vehicle = vehicleResponse.ReturnedObject;
            string filePath = string.Empty;

            (byte[] fileData, string filePath) fileExist = await _fileRepository.GetFileAsync(FileType.VehicleImage, request.FileName);

            if (request.ImageData != null)
            {
                if (fileExist.fileData.Length != 0)
                {
                    return new ResponseBase<string>(false, "A file with this name already exists.", ResponseBase.ResponseStatus.BadQuery);
                }

                filePath = await _fileRepository.SaveFileAsync(FileType.VehicleImage, request.ImageData, request.FileName);
            }
            else
            {
                if (fileExist.fileData.Length == 0)
                {
                    return new ResponseBase<string>(false, "A file with this name does not exists.", ResponseBase.ResponseStatus.BadQuery);
                }

                filePath = fileExist.filePath;
            }


            var updateVehicleCommand = new UpdateVehicleCommand
            {
                Id = vehicle.Id,
            };

            if (request.IsCover)
                updateVehicleCommand.CoverImageUrl = filePath;
            else
                updateVehicleCommand.ImageUrls = vehicle.ImageUrls == null ?
                string.Concat(filePath, ';')
                : string.Concat(vehicle.ImageUrls, filePath, ';');


            var result = await _mediator.Send(updateVehicleCommand, cancellationToken);

            if (!result.Success || result.ReturnedObject == null)
            {
                _fileRepository.DeleteFile(filePath);
                return new ResponseBase<string>(false, "Something went wrong.", ResponseBase.ResponseStatus.Error);
            }

            return new ResponseBase<string>(filePath);
        }
    }
}
