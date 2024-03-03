using CarRental.API.Services;
using CarRental.Application.Functions.Rentals.Commands.AddReservation;
using CarRental.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
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

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Vehicle>> MakeReservation([FromBody] AddReservationCommand addReservationCommand)
        {
            if (_userContextService.GetUserId != null)
                addReservationCommand.ClientId = (Guid)_userContextService.GetUserId;

            var result = await _mediator.Send(addReservationCommand);

            if (result.Success)
                return Ok(result.ReturnedObj);

            if (result.Status == Application.Functions.ResponseBase.ResponseStatus.ValidationError)
                return BadRequest(result.ValidationErrors);

            return BadRequest(result.Message);
        }
    }
}
