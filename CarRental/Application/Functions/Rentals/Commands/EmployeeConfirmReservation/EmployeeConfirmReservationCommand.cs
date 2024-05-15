using CarRental.Domain.Entities;
using MediatR;

namespace CarRental.Application.Functions.Rentals.Commands.EmployeeConfirmReservation
{
    public record EmployeeConfirmReservationCommand(Guid RentalId, Guid EmployeeId) : IRequest<ResponseBase<Rental>>;
}
