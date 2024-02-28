using CarRental.Application.Functions.Vehicles.Commands.AddVehicle;
using CarRental.Domain.Entities;
using CarRental.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarRental.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly ILogger<VehicleController> _logger;
        private readonly CarRentalContext _context;
        private readonly IMediator _mediator;

        public VehicleController(ILogger<VehicleController> logger, CarRentalContext carRentalContext, IMediator mediator)
        {
            _logger = logger;
            _context = carRentalContext;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vehicle>>> GetAllVehicles()
        {
            return Ok(await _context.Vehicles.Include(v => v.Rentals).Include(v => v.Insurances).Include(v => v.VehicleServices).ToListAsync());
        }

        [Authorize(Roles = "admin,manager,employee")]
        [HttpPost]
        public async Task<ActionResult<Vehicle>> AddVehicle(AddVehicleCommand addVehicleCommand)
        {
            var result = await _mediator.Send(addVehicleCommand);

            if (result.Success)
                return Created("", result.ReturnedObj);

            return BadRequest(result.ValidationErrors);
        }
    }
}
