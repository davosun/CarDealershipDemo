using CarDealershipDemo.WebApi.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealershipDemo.Tests
{
    [TestClass]
    public class CarsTests
    {
        private IConfiguration _mockConfig;
        private ICarsService _mockCarsService;

        [TestInitialize]
        public void Setup()
        {
            _mockConfig = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            _mockCarsService = new CarsService(_mockConfig);
        }

        [TestMethod]
        public async Task ListOfCars()
        {
            var cars = await _mockCarsService.GetAllCarsAsync();
            var carsExist = cars.Any();
            Assert.IsTrue(carsExist);
        }

        [TestMethod]
        public async Task FilterByLowMileage()
        {
            var cars = await _mockCarsService.GetFilteredCarsAsync(null, null, null, true, null, null, null, null, false);
            var allAreLowMileage = cars.All(car => car.Miles <= _mockCarsService.DefaultMileageThreshold);
            Assert.IsTrue(allAreLowMileage);
        }

        [TestMethod]
        public async Task FilterWithoutStrictMatching()
        {
            var cars = await _mockCarsService.GetFilteredCarsAsync(null, true, true, null, true, null, null, null, false);
            var someCriteriaMet = cars.All(car => car.HasSunroof || car.IsFourWheelDrive || car.HasPowerWindows);
            Assert.IsTrue(someCriteriaMet);
        }

        [TestMethod]
        public async Task FilterWithStrictMatching()
        {
            var cars = await _mockCarsService.GetFilteredCarsAsync(null, true, true, null, true, null, null, null, true);
            var allCriteriaMet = cars.All(car => car.HasSunroof && car.IsFourWheelDrive && car.HasPowerWindows);
            Assert.IsTrue(allCriteriaMet);
        }
    }
}
