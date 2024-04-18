namespace CarRental.Domain.Entities
{
    public class Employee : User
    {
        public bool PasswordChangeRequired { get; set; }
        public IList<Rental>? AcceptedRentals { get; set; }
        public IList<VehicleService>? CreatedVehicleServices { get; set; }
        public IList<Insurance>? CreatedInsurances { get; set; }
    }
}
