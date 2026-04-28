using CarDealershipDemo.Core.FilterArgs;
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
    }
}
