namespace CarRental.Domain.Entities
{
    public class Customer : User
    {
        public IList<Rental>? Rentals { get; set; }
    }
}
