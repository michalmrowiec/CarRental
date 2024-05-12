using MediatR;

namespace CarRental.Application.Functions.Rentals.Commands.CancelReservation
{
    public record CancelReservationCommand(Guid RentalId) : IRequest<ResponseBase>;
}
