using AutoMapper;
using CarRental.Application.Contracts;
using MediatR;

namespace CarRental.Application.Functions.Rentals.Commands.CancelReservation
{
    public class CancelReservationCommandHandler : IRequestHandler<CancelReservationCommand, ResponseBase>
    {
        private readonly IRentalRepository _rentalRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public CancelReservationCommandHandler(IRentalRepository rentalRepository, IMapper mapper, IMediator mediator)
        {
            _rentalRepository = rentalRepository;
            _mapper = mapper;
            _mediator = mediator;
        }
        public async Task<ResponseBase> Handle(CancelReservationCommand request, CancellationToken cancellationToken)
        {
            var rental = await _rentalRepository.GetByIdAsync(request.RentalId);

            if (rental == null)
            {
                return new ResponseBase(false, "Rental does not exist.", ResponseBase.ResponseStatus.NotFound);
            }

            if (DateTime.Now >= rental.StartDate || (rental.StartDate - DateTime.Now).TotalHours < 48)
            {
                return new ResponseBase(false, "Reservations cannot be canceled.", ResponseBase.ResponseStatus.BadQuery);
            }

            rental.IsCanceled = true;

            try
            {
                await _rentalRepository.UpdateAsync(rental);
            }
            catch (Exception ex)
            {
                return new ResponseBase(false, "Something went wrong.\n" + ex.Message, ResponseBase.ResponseStatus.Error);

            }

            return new ResponseBase();
        }
    }
}
