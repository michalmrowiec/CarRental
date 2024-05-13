using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using MediatR;
using Sieve.Models;

namespace CarRental.Application.Functions.Vehicles.Queries.GetSortedAndFilteredVehicles
{
    public class GetSortedAndFilteredVehiclesQuery : SieveModel, IRequest<ResponseBase<PagedResult<Vehicle>>>
    {
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
}
