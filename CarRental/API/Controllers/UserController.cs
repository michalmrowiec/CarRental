using CarRental.Application.Functions.Users;
using CarRental.Application.Functions.Users.Commands.Login;
using CarRental.Application.Functions.Users.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<VehicleController> _logger;

        public UserController(ILogger<VehicleController> logger, IMediator mediator)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<ActionResult<JwtToken>> Register([FromBody] RegisterClientCommand registerCommand)
        {
            var result = await _mediator.Send(registerCommand);

            if (result.Success)
                return Ok(result.JwtToken);

            return BadRequest(result.ValidationErrors);
        }

        [HttpPost("login")]
        public async Task<ActionResult<JwtToken>> Login([FromBody] LoginCommand loginCommand)
        {
            var result = await _mediator.Send(loginCommand);

            if (result.Success)
                return Ok(result.JwtToken);

            return BadRequest(result.ValidationErrors);
        }
    }
}
