namespace CarRental.Domain.Entities
{
    public class Rental
    {
        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public Guid AcceptingEmployeeId { get; set; }
        public Guid VehicleId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsVehiclePickedUp { get; set; }
        public bool IsVehicleReturned { get; set; }
        public decimal NetAmount { get; set; }
        public decimal VatRate { get; set; }
        public decimal DiscountRate { get; set; }
        public decimal TotalGrossAmount { get; set; }
        public bool IsPaid { get; set; }
        public string PaymentMethod { get; set; }
        public string Comments { get; set; }

        public Client? Client { get; set; }
        public Employee? Employee { get; set; }
        public Vehicle? Vehicle { get; set; }
    }
}
