namespace CarRental.Entities
{
    public class Client : User
    {
        public IList<Rental>? Rentals { get; set; }
    }
}
