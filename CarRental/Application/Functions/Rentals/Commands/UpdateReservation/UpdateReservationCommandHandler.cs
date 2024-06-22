using AutoMapper;
using CarRental.Application.Contracts;
using CarRental.Application.Functions.Rentals.Dtos;
using CarRental.Application.Functions.Rentals.Queries.GetRentalById;
using CarRental.Domain.Entities;
using MediatR;

namespace CarRental.Application.Functions.Rentals.Commands.UpdateReservation
{
    public class UpdateReservationCommandHandler : IRequestHandler<UpdateReservationCommand, ResponseBase<ReservationDto>>
    {
        private readonly IRentalRepository _rentalRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly ILogger<UpdateReservationCommandHandler> _logger;

        public UpdateReservationCommandHandler(IRentalRepository rentalRepository, IMapper mapper, IMediator mediator, ILogger<UpdateReservationCommandHandler> logger)
        {
            _rentalRepository = rentalRepository;
            _mapper = mapper;
            _mediator = mediator;
            _logger = logger;
        }

        public async Task<ResponseBase<ReservationDto>> Handle(UpdateReservationCommand request, CancellationToken cancellationToken)
        {
            var rentalResponse = await _mediator.Send(new GetRentalByIdQuery(request.Id), cancellationToken);

            if (!rentalResponse.Success || rentalResponse.ReturnedObject == null)
            {
                _logger.LogWarning("Failed to update vehicle with ID: {RentalId} - vehicle does not exist.", request.Id);
                return new ResponseBase<ReservationDto>(false, "Rental does not exist", ResponseBase.ResponseStatus.NotFound);
            }

            var rental = rentalResponse.ReturnedObject;

            Rental updatedRental;

            rental.IsVehiclePickedUp = request.IsVehiclePickedUp ?? rental.IsVehiclePickedUp;
            rental.IsVehicleReturned = request.IsVehicleReturned ?? rental.IsVehicleReturned;
            rental.IsPaid = request.IsPaid ?? rental.IsPaid;
            rental.PaymentMethod = request.PaymentMethod ?? rental.PaymentMethod;
            rental.Comments = request.Comments ?? rental.Comments;
            rental.IsCanceled = request.IsCanceled ?? rental.IsCanceled;
            rental.UpdatedAt = DateTime.Now;

            try
            {
                updatedRental = await _rentalRepository.UpdateAsync(rental);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update rental with ID: {RentalId}.", rental.Id);
                return new ResponseBase<ReservationDto>(false, "Something went wrong", ResponseBase.ResponseStatus.Error);
            }

            var rentalDto = _mapper.Map<ReservationDto>(rental);

            return new ResponseBase<ReservationDto>(rentalDto);
        }
    }
}
