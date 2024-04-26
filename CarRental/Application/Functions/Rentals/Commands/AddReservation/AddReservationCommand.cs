using CarRental.Application.Functions.Rentals.Dtos;
using MediatR;

namespace CarRental.Application.Functions.Rentals.Commands.AddReservation
{
    public class AddReservationCommand : IRequest<ResponseBase<ReservationDto>>
    {
        public Guid ClientId { get; set; }
        public Guid VehicleId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal DiscountRate { get; set; }
        public string PaymentMethod { get; set; }
    }
}
