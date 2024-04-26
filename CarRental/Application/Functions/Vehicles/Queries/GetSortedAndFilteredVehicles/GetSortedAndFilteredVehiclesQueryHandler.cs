using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using MediatR;
using Sieve.Models;

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
            if(request.From > request.To)
            {
                return new ResponseBase<PagedResult<Vehicle>>
                    (false, "Wrong dates", ResponseBase.ResponseStatus.BadQuery);
            }

            PagedResult<Vehicle> result;

            try
            {
                if(request.From.HasValue && request.To.HasValue)
                {
                    result = await _vehicleRepository.GetSortedAndFilteredProductsAsync((SieveModel)request, (DateTime)request.From, (DateTime)request.To);
                }
                else
                {
                    result = await _vehicleRepository.GetSortedAndFilteredProductsAsync((SieveModel)request);
                }
            }
            catch (Exception)
            {
                return new ResponseBase<PagedResult<Vehicle>>
                    (false, "Vehicle does not exist.", ResponseBase.ResponseStatus.NotFound);
            }

            return new ResponseBase<PagedResult<Vehicle>>(result);
        }
    }
}
