using CarRental.Domain.Entities;
using CarRental.Infrastructure;
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

        public VehicleController(ILogger<VehicleController> logger, CarRentalContext carRentalContext)
        {
            _logger = logger;
            _context = carRentalContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vehicle>>> GetAllVehicles()
        {
            return Ok(await _context.Vehicles.Include(v => v.Rentals).Include(v => v.Insurances).Include(v => v.VehicleServices).ToListAsync());
        }
    }
}
