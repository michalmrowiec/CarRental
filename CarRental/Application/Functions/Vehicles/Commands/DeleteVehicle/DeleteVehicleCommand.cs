using MediatR;

namespace CarRental.Application.Functions.Vehicles.Commands.DeleteVehicle
{
    public record DeleteVehicleCommand(Guid VehicleId) : IRequest<ResponseBase>;
}
