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
        public async Task<IActionResult> GetCarsAsync(
            string color,
            bool? hasSunroof,
            bool? isFourWheelDrive,
            bool? hasLowMiles,
            bool? hasPowerWindows,
            bool? hasNavigation,
            bool? hasHeatedSeats,
            int? mileageThreshold,
            bool meetAllCriteria,
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
                meetAllCriteria,
                cancellationToken);
            foreach (var car in cars)
            {
                cancellationToken.ThrowIfCancellationRequested();
                car.AssignColorCode();
            }
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
                return NotFound($"Car not found for {nameof(id).ToUpperInvariant()} {id}.");
            }

            car.AssignColorCode();
            return Ok(car);
        }
    }
}
