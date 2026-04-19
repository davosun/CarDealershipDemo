using CarDealershipDemo.WebApi.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Testing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealershipDemo.Tests
{
    [TestClass]
    public class CarsTests
    {
        private IConfiguration _mockConfig;
        private ICarsService _mockCarsService;
        private ILogger<CarsService> _mockLogger;

        [TestInitialize]
        public void Setup()
        {
            _mockConfig = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            _mockLogger = new FakeLogger<CarsService>();

            _mockCarsService = new CarsService(_mockConfig, _mockLogger);
        }

        [TestMethod]
        public async Task ListOfCars()
        {
            var cars = await _mockCarsService.GetAllCarsAsync(1, 5);
            var carsExist = cars.Any();
            Assert.IsTrue(carsExist);
        }

        [TestMethod]
        public async Task FilterByLowMileage()
        {
            var cars = await _mockCarsService.GetFilteredCarsAsync(null, null, null, true, null, null, null, null, false,0,0);
            var allAreLowMileage = cars.All(car => car.Miles <= _mockCarsService.DefaultMileageThreshold);
            Assert.IsTrue(allAreLowMileage);
        }

        [TestMethod]
        public async Task FilterWithoutStrictMatching()
        {
            var cars = await _mockCarsService.GetFilteredCarsAsync(null, true, true, null, true, null, null, null, false, 0, 0);
            var someCriteriaMet = cars.All(car => car.HasSunroof || car.IsFourWheelDrive || car.HasPowerWindows);
            Assert.IsTrue(someCriteriaMet);
        }

        [TestMethod]
        public async Task FilterWithStrictMatching()
        {
            var cars = await _mockCarsService.GetFilteredCarsAsync(null, true, true, null, true, null, null, null, true, 0, 0);
            var allCriteriaMet = cars.All(car => car.HasSunroof && car.IsFourWheelDrive && car.HasPowerWindows);
            Assert.IsTrue(allCriteriaMet);
        }
    }
}
