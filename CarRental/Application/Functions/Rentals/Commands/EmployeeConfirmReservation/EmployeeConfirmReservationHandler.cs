using AutoMapper;
using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using MediatR;

namespace CarRental.Application.Functions.Rentals.Commands.EmployeeConfirmReservation
{
    public class EmployeeConfirmReservationHandler
        : IRequestHandler<EmployeeConfirmReservationCommand, ResponseBase<Rental>>
    {
        private readonly IRentalRepository _rentalRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public EmployeeConfirmReservationHandler(IRentalRepository rentalRepository, IMapper mapper, IMediator mediator)
        {
            _rentalRepository = rentalRepository;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<ResponseBase<Rental>> Handle(EmployeeConfirmReservationCommand request, CancellationToken cancellationToken)
        {
            var rental = await _rentalRepository.GetByIdAsync(request.RentalId);

            if (rental == null)
            {
                return new ResponseBase<Rental>(false, "Rental does not exist.", ResponseBase.ResponseStatus.NotFound);
            }

            if (rental.IsConfirmedByEmployee)
            {
                return new ResponseBase<Rental>
                    (true, "Rental is arleady confirmed.", ResponseBase.ResponseStatus.Success, rental);
            }

            if (rental.IsCanceled)
            {
                return new ResponseBase<Rental>
                    (true, "Canceled rental can not be confirmed.", ResponseBase.ResponseStatus.BadQuery);
            }

            rental.IsConfirmedByEmployee = true;
            rental.AcceptingEmployeeId = request.EmployeeId;

            var updatedRental = await _rentalRepository.UpdateAsync(rental);

            return new ResponseBase<Rental>(updatedRental);
        }
    }
}
