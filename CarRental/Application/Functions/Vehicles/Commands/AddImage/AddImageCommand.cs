using MediatR;

namespace CarRental.Application.Functions.Vehicles.Commands.AddImage
{
    public record AddImageCommand(byte[] ImageData, string FileName, Guid VehicleId)
        : IRequest<ResponseBase<string>>;
}
