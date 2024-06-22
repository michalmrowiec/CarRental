using CarRental.API.Services;
using CarRental.Application.Functions.Rentals.Commands.AddReservation;
using CarRental.Application.Functions.Rentals.Commands.CancelReservation;
using CarRental.Application.Functions.Rentals.Commands.EmployeeConfirmReservation;
using CarRental.Application.Functions.Rentals.Commands.UpdateReservation;
using CarRental.Application.Functions.Rentals.Dtos;
using CarRental.Application.Functions.Rentals.Queries.GetSortedAndFilteredRentals;
using CarRental.Application.Functions.Rentals.Queries.RentalSortFilterOptions;
using CarRental.Application.Functions.Vehicles.Commands.UpdateVehicle;
using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RentalController : ControllerBase
    {
        private readonly ILogger<RentalController> _logger;
        private readonly IMediator _mediator;
        private readonly IUserContextService _userContextService;

        public RentalController(ILogger<RentalController> logger, IMediator mediator, IUserContextService userContextService)
        {
            _logger = logger;
            _mediator = mediator;
            _userContextService = userContextService;
        }

        [HttpPost]
        public async Task<ActionResult<ReservationDto>> MakeReservation([FromBody] AddReservationCommand addReservationCommand)
        {
            if (_userContextService.GetUserId != null)
                addReservationCommand.ClientId = (Guid)_userContextService.GetUserId;

            var result = await _mediator.Send(addReservationCommand);

            if (result.Success)
                return Ok(result.ReturnedObject);

            if (result.Status == Application.Functions.ResponseBase.ResponseStatus.ValidationError)
                return BadRequest(result.ValidationErrors);

            return BadRequest(result.Message);
        }

        [HttpPut("cancel/{RentalId}")]
        public async Task<ActionResult> CancelReservation([FromRoute] Guid RentalId)
        {
            var result = await _mediator.Send(new CancelReservationCommand(RentalId));

            if (result.Success)
                return Ok();

            if (result.Status == Application.Functions.ResponseBase.ResponseStatus.NotFound)
                return NotFound();

            return BadRequest(result.Message);
        }


        [Authorize(Roles = "admin,manager,employee")]
        [HttpPut("confirm/{RentalId}")]
        public async Task<ActionResult> ConfirmReservation([FromRoute] Guid RentalId)
        {
            if (_userContextService.GetUserId == null)
                return Unauthorized();

            var result = await _mediator.Send(
                new EmployeeConfirmReservationCommand(RentalId, (Guid)_userContextService.GetUserId));

            if (result.Success)
                return Ok(result.ReturnedObject);

            if (result.Status == Application.Functions.ResponseBase.ResponseStatus.NotFound)
                return NotFound();

            return BadRequest(result.Message);
        }

        [Authorize(Roles = "admin,manager,employee")]
        [HttpPut]
        public async Task<ActionResult<ReservationDto>> UpdateVehicle([FromBody] UpdateReservationCommand updateReservationCommand)
        {
            var result = await _mediator.Send(updateReservationCommand);

            if (result.Success)
                return Ok(result.ReturnedObject);

            if (result.Status == Application.Functions.ResponseBase.ResponseStatus.ValidationError)
                return BadRequest(result.ValidationErrors);

            return BadRequest(result.Message);
        }

        [HttpPost("get-filtered/customer-rentals")]
        public async Task<ActionResult<PagedResult<Rental>>> GetCustomerRentals([FromBody] GetSortedAndFilteredRentalsQuery query)
        {
            query.Filters = $"ClientId=={_userContextService.GetUserId}";

            var result = await _mediator.Send(query);

            if (result.Success)
                return Ok(result.ReturnedObject);

            return BadRequest(result.Message);
        }

        [Authorize(Roles = "admin,manager,employee")]
        [HttpPost("get-filtered")]
        public async Task<ActionResult<PagedResult<Rental>>> GetSortedAndFilteredRentals([FromBody] GetSortedAndFilteredRentalsQuery query)
        {
            var result = await _mediator.Send(query);

            if (result.Success)
                return Ok(result.ReturnedObject);

            return BadRequest(result.Message);
        }

        [Authorize(Roles = "admin,manager,employee")]
        [HttpOptions("get-filtered")]
        public async Task<ActionResult<object>> OptionsOfGetSortedAndFilteredRentals()
        {
            var result = await _mediator.Send(new RentalSortFilterOptionsQuery());

            var options =
                @"?sorts=     LikeCount,CommentCount,-created         // sort by likes, then comments, then descendingly by date created \n
&filters=   LikeCount>10, Title@=awesome title,     // filter to posts with more than 10 likes, and a title that contains the phrase ""awesome title""
&page=      1                                       // get the first page...
&pageSize=  10                                      // ...which contains 10 posts

More info you can find here: github.com/Biarity/Sieve#send-a-request";

            //return Ok(new { QueryFormat = options, AvailableValues = result });
            return Ok(result);
        }
    }
}
