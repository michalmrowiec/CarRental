using MediatR;

namespace CarRental.Application.Functions.Rentals.Queries.RentalSortFilterOptions
{
    public record RentalSortFilterOptionsQuery : IRequest<object>;
}
