﻿namespace CarRental.Domain.Entities
{
    public class Insurance
    {
        public Guid Id { get; set; }
        public string PolicyNumber { get; set; }
        public string Insurer { get; set; }
        public string InsurerAddress { get; set; }
        public string InsurerPhoneNumber { get; set; }
        public string InsuranceType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
        public decimal NetCost { get; set; }
        public decimal VatRate { get; set; }
        public decimal TotalGrossCost { get; set; }
        public string Currency { get; set; }
        public string InsuranceConditions { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid CreatedByEmployeeId { get; set; }
        public Guid VehicleId { get; set; }

        public Vehicle? Vehicle { get; set; }
        public Employee? Employee { get; set; }
    }
}

