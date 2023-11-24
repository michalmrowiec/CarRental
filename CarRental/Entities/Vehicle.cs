namespace CarRental.Entities
{
    public class Vehicle
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string VinNumber { get; set; }
        public string LicensePlate { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int YearOfProduction { get; set; }
        public string BodyType { get; set; }
        public string FuelType { get; set; }
        public string Color { get; set; }
        public float Mileage { get; set; }
        public float EngineSize { get; set; }
        public int EnginePower { get; set; }
        public int Torqe { get; set; }
        public string GearboxType { get; set; }
        public float Weight { get; set; }
        public int NumberOfDoors { get; set; }
        public string CarEquipment { get; set; }
        public bool IsAvailable { get; set; }
        public DateTime NextCarInspection { get; set; }
        public decimal RentalNetPricePerDay { get; set; }
        public string Currency { get; set; }
        public decimal VatRate { get; set; }

        public IList<Insurance>? Insurances { get; set; }
        public IList<VehicleService>? VehicleServices { get; set; }
        public IList<Rental>? Rentals { get; set; }
    }
}
