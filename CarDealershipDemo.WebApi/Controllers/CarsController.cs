using CarDealershipDemo.Core.FilterArgs;
using CarDealershipDemo.Core.Models;
using CarDealershipDemo.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace CarDealershipDemo.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarsController(ICarService carsService)
        {
            _carService = carsService;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetCarsAsync([FromQuery] CarFilterArgs args, CancellationToken cancellationToken = default)
        {
            var cars = await _carService.GetCarsAsync(args, cancellationToken);
            return Ok(cars);
        }

        [HttpGet("{carId}", Name = "GetCarById")]
        public async Task<IActionResult> GetCarAsync(string carId, CancellationToken cancellationToken = default)
        {
            var cars = await _carService.GetCarAsync(carId, cancellationToken);
            if (cars.Count == 0)
            {
                return NotFound();
            }

            var car = cars[0];
            return Ok(car);
        }

        [HttpPost("")]
        public async Task<IActionResult> AddCarAsync(Car dto, CancellationToken cancellationToken = default)
        {
            var car = await _carService.AddCarAsync(dto, cancellationToken);
            return CreatedAtRoute("GetCarById", new { carId = car.Id }, car);
        }

        [HttpPut("{carId}")]
        public async Task<IActionResult> UpdateCarAsync(string carId, Car dto, CancellationToken cancellationToken = default)
        {
            await _carService.UpdateCarAsync(carId, dto, cancellationToken);
            return NoContent();
        }

        [HttpDelete("{carId}")]
        public async Task<IActionResult> SoftRemoveCarAsync(string carId, CancellationToken cancellationToken= default)
        {
            await _carService.SoftRemoveCarAsync(carId, cancellationToken);
            return NoContent();
        }
    }
}
