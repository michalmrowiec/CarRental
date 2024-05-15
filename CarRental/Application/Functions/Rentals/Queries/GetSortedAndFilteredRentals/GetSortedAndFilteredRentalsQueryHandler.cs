using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using MediatR;

namespace CarRental.Application.Functions.Rentals.Queries.GetSortedAndFilteredRentals
{
    public class GetSortedAndFilteredRentalsQueryHandler
        : IRequestHandler<GetSortedAndFilteredRentalsQuery, ResponseBase<PagedResult<Rental>>>
    {
        private readonly IRentalRepository _rentalRepository;

        public GetSortedAndFilteredRentalsQueryHandler(IRentalRepository rentalRepository)
        {
            _rentalRepository = rentalRepository;
        }

        public async Task<ResponseBase<PagedResult<Rental>>> Handle(GetSortedAndFilteredRentalsQuery request, CancellationToken cancellationToken)
        {
            if (request.From > request.To)
            {
                return new ResponseBase<PagedResult<Rental>>
                    (false, "Wrong dates", ResponseBase.ResponseStatus.BadQuery);
            }

            PagedResult<Rental> result;

            try
            {
                if (request.From.HasValue && request.To.HasValue)
                {
                    result = await _rentalRepository.GetSortedAndFilteredProductsAsync(request, (DateTime)request.From, (DateTime)request.To);
                }
                else
                {
                    result = await _rentalRepository.GetSortedAndFilteredProductsAsync(request);
                }
            }
            catch (Exception)
            {
                return new ResponseBase<PagedResult<Rental>>
                    (false, "Vehicle does not exist.", ResponseBase.ResponseStatus.NotFound);
            }

            return new ResponseBase<PagedResult<Rental>>(result);
        }
    }
}
