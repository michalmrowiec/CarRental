namespace CarRental.Application.Functions.Rentals.Dtos
{
    public class ReservationDto
    {
        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public Guid VehicleId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal NetAmountWithoutDiscount { get; set; }
        public decimal VatRate { get; set; }
        public decimal DiscountRate { get; set; }
        public decimal TotalGrossAmount { get; set; }
        public bool IsPaid { get; set; }
        public string PaymentMethod { get; set; }
    }
}
