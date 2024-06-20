using CarRental.Domain.Entities;
using MediatR;

namespace CarRental.Application.Functions.Rentals.Queries.GetRentalById
{
    public record GetRentalByIdQuery(Guid RentalId) : IRequest<ResponseBase<Rental>>;
}
