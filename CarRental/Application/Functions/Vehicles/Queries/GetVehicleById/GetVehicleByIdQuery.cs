using CarRental.Domain.Entities;
using MediatR;

namespace CarRental.Application.Functions.Vehicles.Queries.GetVehicleById
{
    public record GetVehicleByIdQuery(Guid VehicleId) : IRequest<ResponseBase<Vehicle>>;
}
