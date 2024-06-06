using AutoMapper;
using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using CarRental.Domain.Services.Rentals;
using MediatR;
using Sieve.Models;

namespace CarRental.Application.Functions.Vehicles.Queries.GetSortedAndFilteredVehicles
{
    public class GetSortedAndFilteredVehiclesQueryHandler : IRequestHandler<GetSortedAndFilteredVehiclesQuery, ResponseBase<PagedResult<VehicleDto>>>
    {
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IMapper _mapper;

        public GetSortedAndFilteredVehiclesQueryHandler(IVehicleRepository vehicleRepository, IMapper mapper)
        {
            _vehicleRepository = vehicleRepository;
            _mapper = mapper;
        }

        public async Task<ResponseBase<PagedResult<VehicleDto>>> Handle(GetSortedAndFilteredVehiclesQuery request, CancellationToken cancellationToken)
        {
            if (request.From > request.To)
            {
                return new ResponseBase<PagedResult<VehicleDto>>
                    (false, "Wrong dates", ResponseBase.ResponseStatus.BadQuery);
            }

            PagedResult<Vehicle> result;

            try
            {
                if (request.From.HasValue && request.To.HasValue)
                {
                    result = await _vehicleRepository.GetSortedAndFilteredProductsAsync((SieveModel)request, (DateTime)request.From, (DateTime)request.To);
                }
                else
                {
                    result = await _vehicleRepository.GetSortedAndFilteredProductsAsync((SieveModel)request);
                }
            }
            catch (Exception e)
            {
                return new ResponseBase<PagedResult<VehicleDto>>
                    (false, "Something went wrong.", ResponseBase.ResponseStatus.Error);
            }

            var mapped = _mapper.Map<List<VehicleDto>>(result.Items);
            if (mapped == null)
            {
                return new ResponseBase<PagedResult<VehicleDto>>
                    (false, "Something went wrong.", ResponseBase.ResponseStatus.Error);
            }


            PagedResult<VehicleDto> resultMapped = new((IList<VehicleDto>)mapped!, result.TotalItems, (int)request.PageSize!, (int)request.Page!);

            foreach (var vehicleMapped in resultMapped.Items)
            {
                if (request.From.HasValue && request.To.HasValue)
                {
                    DateTime from = request.From.Value;
                    DateTime to = request.To.Value;
                    var days = to.Subtract(from).Days;

                    var priceService = new PriceService(0, vehicleMapped.VatRate, vehicleMapped.RentalNetPricePerDay, days);

                    vehicleMapped.EstimatedTotalGrossAmount = priceService.GetTotalGrossPrice();

                }
            }

            return new ResponseBase<PagedResult<VehicleDto>>(resultMapped);
        }
    }
}
