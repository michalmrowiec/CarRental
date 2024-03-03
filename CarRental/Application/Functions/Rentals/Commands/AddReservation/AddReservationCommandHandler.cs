using AutoMapper;
using CarRental.Application.Contracts;
using CarRental.Application.Functions.Rentals.Dtos;
using CarRental.Application.Functions.Vehicles.Queries.GetVehicleById;
using CarRental.Domain.Entities;
using CarRental.Domain.Services.Rentals;
using MediatR;

namespace CarRental.Application.Functions.Rentals.Commands.AddReservation
{
    public class AddReservationCommandHandler : IRequestHandler<AddReservationCommand, ResponseBase<ReservationDto>>
    {
        private readonly IRentalRepository _rentalRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public AddReservationCommandHandler(IRentalRepository rentalRepository, IMapper mapper, IMediator mediator)
        {
            _rentalRepository = rentalRepository;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<ResponseBase<ReservationDto>> Handle(AddReservationCommand request, CancellationToken cancellationToken)
        {
            var vehicleResponse = await _mediator.Send(new GetVehicleByIdQuery(request.VehicleId));

            if (!vehicleResponse.Success || vehicleResponse.ReturnedObj == null)
            {
                return new ResponseBase<ReservationDto>(false, "Vehicle does not exist.", ResponseBase.ResponseStatus.NotFound);
            }

            var vehicle = vehicleResponse.ReturnedObj;

            var allRentalsForVehicle = await _rentalRepository.GetAllForVehicleAsync(request.VehicleId);
            var rentalService = new ReservationService(allRentalsForVehicle);
            var isAvailable = rentalService.CheckReservationAvailability(request.StartDate, request.EndDate);
            if (!isAvailable)
            {
                return new ResponseBase<ReservationDto>(false, "The given days are already reserved.", ResponseBase.ResponseStatus.BadQuery);
            }

            var mappedRental = _mapper.Map<Rental>(request);
            mappedRental.CreatedAt = DateTime.UtcNow;
            mappedRental.UpdatedAt = DateTime.UtcNow;
            mappedRental.Comments = string.Empty;

            var days = request.EndDate.Subtract(request.StartDate).Days;

            var priceService = new PriceService(request.DiscountRate, vehicle.VatRate, vehicle.RentalNetPricePerDay, days);

            mappedRental.NetAmountWithoutDiscount = priceService.GetTotalNetPriceWithoutDiscount();
            mappedRental.VatRate = vehicle.VatRate;
            mappedRental.TotalGrossAmount = priceService.GetTotalGrossPrice();

            Rental addedRental;
            try
            {
                addedRental = await _rentalRepository.CreateAsync(mappedRental);

            }
            catch (Exception ex)
            {
                return new ResponseBase<ReservationDto>(false, "Something went wrong.\n" + ex.Message, ResponseBase.ResponseStatus.Error);
                return new ResponseBase<ReservationDto>(false, "Something went wrong.", ResponseBase.ResponseStatus.Error);
            }

            var mappedRentalDto = _mapper.Map<ReservationDto>(addedRental);

            return new ResponseBase<ReservationDto>(mappedRentalDto);
        }
    }
}
