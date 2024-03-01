﻿using CarRental.Application.Functions.Vehicles.Commands.AddImage;
using CarRental.Application.Functions.Vehicles.Commands.AddVehicle;
using CarRental.Application.Functions.Vehicles.Commands.DeleteVehicle;
using CarRental.Application.Functions.Vehicles.Commands.UpdateVehicle;
using CarRental.Application.Functions.Vehicles.Queries.GetSortedAndFilteredVehicles;
using CarRental.Domain.Entities;
using CarRental.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace CarRental.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly ILogger<VehicleController> _logger;
        private readonly IMediator _mediator;

        public VehicleController(ILogger<VehicleController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        [HttpPost("get-filtered")]
        public async Task<ActionResult<PagedResult<Vehicle>>> GetSortedAndFilteredVehicles([FromBody] SieveModel sieveModel)
        {
            var result = await _mediator.Send(new GetSortedAndFilteredVehiclesQuery(sieveModel));

            if (result.Success)
                return Ok(result.ReturnedObj);

            return BadRequest(result.Message);
        }

        [HttpOptions("get-filtered")]
        public ActionResult<string> OptionsOfGetSortedAndFilteredVehicles()
        {
            var options =
                @"?sorts=     LikeCount,CommentCount,-created         // sort by likes, then comments, then descendingly by date created 
&filters=   LikeCount>10, Title@=awesome title,     // filter to posts with more than 10 likes, and a title that contains the phrase ""awesome title""
&page=      1                                       // get the first page...
&pageSize=  10                                      // ...which contains 10 posts

More info you can find here: github.com/Biarity/Sieve#send-a-request";

            return Ok(options);
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

        [Authorize(Roles = "admin,manager,employee")]
        [HttpPost("upload-image/{vehicleId}")]
        public async Task<ActionResult> UploadImage(IFormFile file, [FromRoute] Guid vehicleId)
        {
            byte[] imageData;
            using MemoryStream memoryStream = new();
            await file.CopyToAsync(memoryStream);
            imageData = memoryStream.ToArray();

            var result = await _mediator.Send(new AddImageCommand(imageData, file.FileName, vehicleId));

            if (result.Success)
                return Created(result.ReturnedObj ?? "", null);

            return BadRequest(result.Message);
        }

        [Authorize(Roles = "admin,manager,employee")]
        [HttpPut]
        public async Task<ActionResult<Vehicle>> UpdateVehicle([FromBody] UpdateVehicleCommand updateVehicleCommand)
        {
            var result = await _mediator.Send(updateVehicleCommand);

            if (result.Success)
                return Ok(result.ReturnedObj);

            if (result.Status == Application.Functions.ResponseBase.ResponseStatus.ValidationError)
                return BadRequest(result.ValidationErrors);

            return BadRequest(result.Message);
        }

        [Authorize(Roles = "admin,manager,employee")]
        [HttpDelete("{vehicleId}")]
        public async Task<ActionResult> DeleteVehicle([FromRoute] Guid vehicleId)
        {
            var result = await _mediator.Send(new DeleteVehicleCommand(vehicleId));

            if (result.Success)
                return NoContent();

            return BadRequest(result.Message);
        }
    }
}
