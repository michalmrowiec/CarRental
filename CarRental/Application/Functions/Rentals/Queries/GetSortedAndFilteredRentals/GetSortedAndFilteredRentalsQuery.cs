using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using MediatR;
using Sieve.Models;

namespace CarRental.Application.Functions.Rentals.Queries.GetSortedAndFilteredRentals
{
    public class GetSortedAndFilteredRentalsQuery : SieveModel, IRequest<ResponseBase<PagedResult<Rental>>>
    {
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
}
