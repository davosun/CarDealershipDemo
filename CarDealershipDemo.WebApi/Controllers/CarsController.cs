using CarDealershipDemo.WebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace CarDealershipDemo.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly ILogger<CarsController> _logger;
        private readonly ICarsService _carsService;

        public CarsController(ILogger<CarsController> logger, ICarsService carsService)
        {
            _logger = logger;
            _carsService = carsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCarsAsync(CancellationToken cancellationToken)
        {
            var cars = await _carsService.GetAllCarsAsync(cancellationToken);
            return Ok(cars);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilteredCarsAsync(
            string color,
            bool? hasSunroof,
            bool? isFourWheelDrive,
            bool? hasLowMiles,
            bool? hasPowerWindows,
            bool? hasNavigation,
            bool? hasHeatedSeats,
            int? mileageThreshold,
            bool strictSearch,
            CancellationToken cancellationToken)
        {
            var cars = await _carsService.GetFilteredCarsAsync(
                color,
                hasSunroof,
                isFourWheelDrive,
                hasLowMiles,
                hasPowerWindows,
                hasNavigation,
                hasHeatedSeats,
                mileageThreshold,
                strictSearch,
                cancellationToken);
            return Ok(cars);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarAsync(string id, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return BadRequest($"{nameof(id)} cannot be empty.");
            }

            var car = await _carsService.GetCarAsync(id, cancellationToken);
            if (car == null)
            {
                return NotFound($"Car not found for {nameof(id)} {id}.");
            }

            return Ok(car);
        }
    }
}
