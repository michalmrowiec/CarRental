using CarRental.Domain.Entities;

namespace CarRental.Domain.Services.Rentals
{
    public class ReservationService
    {
        private readonly IList<Rental> _rentals;
        public ReservationService(IList<Rental> rentals)
        {
            _rentals = rentals;
        }

        /// <summary>
        /// Checks if the given date range is available for reservation.
        /// </summary>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <param name="allReservedDays"></param>
        /// <returns>Returns true if all days in the desired date range are available for reservation, false otherwise.</returns>
        public bool CheckReservationAvailability(DateTime startDate, DateTime endDate)
        {
            var result = GetAllReservedDays(_rentals).Intersect(ListDaysBetweenDates(startDate.Date, endDate.Date));
            return !result.Any();
        }
        public bool CheckReservationAvailability(Guid vehicleId, DateTime startDate, DateTime endDate)
        {
            var allReservations = GetAllReservedDays(_rentals.Where(r => r.VehicleId.Equals(vehicleId)).ToList()).Select(d => d.Date);
            var newReservationDates = ListDaysBetweenDates(startDate.Date, endDate.Date).Select(d => d.Date);
            var result = allReservations.Intersect(newReservationDates).ToList();
            return !result.Any();
        }

        public List<DateTime> GetAllReservedDays(IList<Rental> rentals)
        {
            var allReservedDays = new List<DateTime>();

            foreach (var rental in rentals)
            {
                var reservedDays = ListDaysBetweenDates(rental.StartDate.Date, rental.EndDate.Date);
                allReservedDays.AddRange(reservedDays);
            }

            return allReservedDays;
        }

        private List<DateTime> ListDaysBetweenDates(DateTime startDate, DateTime endDate)
        {
            var totalDays = (endDate - startDate).Days;
            var reservedDays = new List<DateTime>();

            for (int i = 0; i <= totalDays; i++)
            {
                reservedDays.Add(startDate.AddDays(i).Date);
            }

            return reservedDays;
        }
    }
}
