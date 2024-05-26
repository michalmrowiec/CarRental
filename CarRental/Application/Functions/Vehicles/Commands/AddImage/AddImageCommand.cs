using MediatR;

namespace CarRental.Application.Functions.Vehicles.Commands.AddImage
{
    public record AddImageCommand(string FileName, bool IsCover, Guid VehicleId, byte[]? ImageData = null)
        : IRequest<ResponseBase<string>>;
}
