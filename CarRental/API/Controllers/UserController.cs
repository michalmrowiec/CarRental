using CarRental.Application.Functions.Users;
using CarRental.Application.Functions.Users.Commands.AddEmployee;
using CarRental.Application.Functions.Users.Commands.Login;
using CarRental.Application.Functions.Users.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<ActionResult<JwtToken>> Register([FromBody] RegisterCustomerCommand registerCommand)
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

        [Authorize(Roles = "admin")]
        [HttpPost("add-employee")]
        public async Task<ActionResult<JwtToken>> AddEmployee([FromBody] AddEmployeeCommand addEmployee)
        {
            var result = await _mediator.Send(addEmployee);

            if (result.Success)
                return Created("", null);

            return BadRequest(result.ValidationErrors);
        }
    }
}
