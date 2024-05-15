using CarRental.Application.Contracts;
using MediatR;

namespace CarRental.Application.Functions.Rentals.Queries.RentalSortFilterOptions
{
    public class RentalSortFilterOptionsQueryHandler : IRequestHandler<RentalSortFilterOptionsQuery, object>
    {
        private readonly IRentalRepository _rentalRepository;

        public RentalSortFilterOptionsQueryHandler(IRentalRepository rentalRepository)
        {
            _rentalRepository = rentalRepository;
        }
        public async Task<object> Handle(RentalSortFilterOptionsQuery request, CancellationToken cancellationToken)
        {
            var vehicles = await _rentalRepository.GetAllAsync();
            var options =
                new
                {
                    IsCanceled = vehicles.Select(v => v.IsCanceled).Distinct().Order().ToList(),
                    ClientId = "Guid <string>",
                    IsPaid = vehicles.Select(v => v.IsPaid).Distinct().ToList(),
                    IsVehiclePickedUp = vehicles.Select(v => v.IsVehiclePickedUp).Distinct().ToList(),
                    IsVehicleReturned = vehicles.Select(v => v.IsVehicleReturned).Distinct().ToList(),
                    VehicleId = vehicles.Select(v => v.VehicleId).Distinct().ToList(),
                    IsConfirmedByEmployee = vehicles.Select(v => v.IsConfirmedByEmployee).Distinct().ToList(),
                    Id = "Guid <string>",
                    StartDate = $"DateTime <{DateTime.Now}>",
                    EndDate = $"DateTime <{DateTime.Now}>",
                    CreatedAt = $"DateTime <{DateTime.Now}>",
                    UpdatedAt = $"DateTime <{DateTime.Now}>"
                };

            return options;
        }
    }
}