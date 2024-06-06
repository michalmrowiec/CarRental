using CarRental.Domain.Entities;

namespace CarRental.Application.Functions.Vehicles.Queries.GetSortedAndFilteredVehicles
{
    public class VehicleDto : Vehicle
    {
        public decimal EstimatedTotalGrossAmount { get; set; }
    }
}
