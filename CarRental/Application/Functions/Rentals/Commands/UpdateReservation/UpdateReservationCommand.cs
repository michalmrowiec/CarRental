using CarRental.Application.Functions.Rentals.Dtos;
using MediatR;

namespace CarRental.Application.Functions.Rentals.Commands.UpdateReservation
{
    public class UpdateReservationCommand : IRequest<ResponseBase<ReservationDto>>
    {
        public Guid Id { get; set; }
        public bool? IsVehiclePickedUp { get; set; }
        public bool? IsVehicleReturned { get; set; }
        public bool? IsPaid { get; set; }
        public string? PaymentMethod { get; set; }
        public string? Comments { get; set; }
        public bool? IsCanceled { get; set; }
    }
}
