using MediatR;

namespace CarRental.Application.Functions.Vehicles.Queries.VehicleSortFilterOptions
{
    public record VehicleSortFilterOptionsQuery : IRequest<object>;
}
