namespace CarRental.Domain.Entities
{
    public class Client : User
    {
        public IList<Rental>? Rentals { get; set; }
    }
}
