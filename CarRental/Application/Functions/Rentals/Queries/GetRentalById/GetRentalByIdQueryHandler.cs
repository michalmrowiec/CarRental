using AutoMapper;
using CarRental.Application.Contracts;
using CarRental.Application.Functions.Rentals.Dtos;
using CarRental.Domain.Entities;
using MediatR;

namespace CarRental.Application.Functions.Rentals.Queries.GetRentalById
{
    public class GetRentalByIdQueryHandler : IRequestHandler<GetRentalByIdQuery, ResponseBase<Rental>>
    {
        private readonly IRentalRepository _rentalRepository;
        private readonly IMapper _mapper;

        public GetRentalByIdQueryHandler(IRentalRepository rentalRepository, IMapper mapper)
        {
            _rentalRepository = rentalRepository;
            _mapper = mapper;
        }

        public async Task<ResponseBase<Rental>> Handle(GetRentalByIdQuery request, CancellationToken cancellationToken)
        {
            Rental rental;
            try
            {
                rental = await _rentalRepository.GetByIdAsync(request.RentalId);
            }
            catch (Exception)
            {
                return new ResponseBase<Rental>(false, "Rental does not exist.", ResponseBase.ResponseStatus.NotFound);
            }

            return new ResponseBase<Rental>(rental);
        }
    }
}
