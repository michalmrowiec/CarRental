using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using MediatR;
using Sieve.Models;

namespace CarRental.Application.Functions.Vehicles.Queries.GetSortedAndFilteredVehicles
{
    public record GetSortedAndFilteredVehiclesQuery(SieveModel SieveModel) : IRequest<ResponseBase<PagedResult<Vehicle>>>;
}
