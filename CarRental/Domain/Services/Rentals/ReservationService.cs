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
            var result = GetAllReservedDays().Intersect(ListDaysBetweenDates(startDate, endDate));
            return !result.Any();
        }

        public List<DateTime> GetAllReservedDays()
        {
            var allReservedDays = new List<DateTime>();

            foreach (var rental in _rentals)
            {
                var reservedDays = ListDaysBetweenDates(rental.StartDate, rental.EndDate);
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
                reservedDays.Add(startDate.AddDays(i));
            }

            return reservedDays;
        }
    }
}
