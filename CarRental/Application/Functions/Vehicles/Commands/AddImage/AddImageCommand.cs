using MediatR;

namespace CarRental.Application.Functions.Vehicles.Commands.AddImage
{
    public record AddImageCommand(byte[] ImageData, string FileName, bool IsCover, Guid VehicleId)
        : IRequest<ResponseBase<string>>;
}
