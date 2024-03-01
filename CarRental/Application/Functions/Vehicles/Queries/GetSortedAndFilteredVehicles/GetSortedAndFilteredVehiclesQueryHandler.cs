using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using MediatR;

namespace CarRental.Application.Functions.Vehicles.Queries.GetSortedAndFilteredVehicles
{
    public class GetSortedAndFilteredVehiclesQueryHandler : IRequestHandler<GetSortedAndFilteredVehiclesQuery, ResponseBase<PagedResult<Vehicle>>>
    {
        private readonly IVehicleRepository _vehicleRepository;

        public GetSortedAndFilteredVehiclesQueryHandler(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public async Task<ResponseBase<PagedResult<Vehicle>>> Handle(GetSortedAndFilteredVehiclesQuery request, CancellationToken cancellationToken)
        {
            PagedResult<Vehicle> result;

            try
            {
                result = await _vehicleRepository.GetSortedAndFilteredProductsAsync(request.SieveModel);
            }
            catch (Exception)
            {
                return new ResponseBase<PagedResult<Vehicle>>(false, "Vehicle does not exist.", ResponseBase.ResponseStatus.NotFound);
            }

            return new ResponseBase<PagedResult<Vehicle>>(result);
        }
    }
}
