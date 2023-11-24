namespace CarRental.Entities
{
    public class VehicleService
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime PlannedDate { get; set; }
        public DateTime ExecureDate { get; set; }
        public decimal NetCost { get; set; }
        public string Currency { get; set; }
        public decimal VatRate { get; set; }
        public decimal TotalGrossCost { get; set; }
        public Guid VehicleId { get; set;}
        public Guid CreatedByEmployeeId { get; set; }

        public Vehicle? Vehicle { get; set; }
        public Employee? Employee {  get; set; }
    }
}
