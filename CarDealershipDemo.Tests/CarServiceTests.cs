using CarDealershipDemo.Core.FilterArgs;
using CarDealershipDemo.Core.Repositories;
using CarDealershipDemo.Core.Services;
using CarDealershipDemo.Infra.Data;
using CarDealershipDemo.Infra.Data.Repositories;
using CarDealershipDemo.WebApi.Services;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CarDealershipDemo.Tests
{
    [TestClass]
    public class CarServiceTests
    {
        private SqliteConnection _connection;
        private AppDbContext _db;
        private ICarRepository _carRepository;
        private ICarService _carService;

        private static readonly CancellationToken _cancellationToken = CancellationToken.None;

        [TestInitialize]
        public void Setup()
        {
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            var options = new DbContextOptionsBuilder()
                .UseSqlite(_connection)
                .Options;
            _db = new AppDbContext(options);
            _db.Database.EnsureDeleted();
            _db.Database.EnsureCreated();

            _carRepository = new CarRepository(_db);
            _carService = new CarService(_carRepository);
        }

        [TestCleanup]
        public void Teardown()
        {
            _connection.Dispose();
            _db.Dispose();
        }

        [TestMethod]
        public async Task ListOfCars()
        {
            var args = new CarFilterArgs();
            var cars = await _carService.GetCarsAsync(args, _cancellationToken);
            Assert.IsNotEmpty(cars);
        }

        [TestMethod]
        public async Task FilterByLowMileage()
        {
            var args = new CarFilterArgs
            {
                HasLowMiles = true,
            };
            var cars = await _carService.GetCarsAsync(args, _cancellationToken);
            var allAreLowMileage = cars.All(car => car.Miles <= args.LowMileageThreshold);
            Assert.IsNotEmpty(cars);
            Assert.IsTrue(allAreLowMileage);
        }

        [TestMethod]
        public async Task FilterWithoutStrictMatching()
        {
            var args = new CarFilterArgs
            {
                HasSunroof = true,
                IsFourWheelDrive = true,
                HasPowerWindows = true,
            };
            var cars = await _carService.GetCarsAsync(args, _cancellationToken);
            var someCriteriaMet = cars.All(car => car.HasSunroof || car.IsFourWheelDrive || car.HasPowerWindows);
            Assert.IsNotEmpty(cars);
            Assert.IsTrue(someCriteriaMet);
        }

        [TestMethod]
        public async Task FilterWithStrictMatching()
        {
            var args = new CarFilterArgs
            {
                HasSunroof = true,
                IsFourWheelDrive = true,
                HasPowerWindows = true,
                StrictSearch = true
            };
            var cars = await _carService.GetCarsAsync(args, _cancellationToken);
            var allCriteriaMet = cars.All(car => car.HasSunroof && car.IsFourWheelDrive && car.HasPowerWindows);
            Assert.IsNotEmpty(cars);
            Assert.IsTrue(allCriteriaMet);
        }

        [TestMethod]
        public void SeedPathTest()
        {
            var currentDirectory = Directory.GetCurrentDirectory();
            Console.WriteLine(currentDirectory);

            var seedPathSearch = Path.Combine("Data", "Seed", "Cars.json");
            var seedPath = Directory.EnumerateFiles(currentDirectory, "*", new EnumerationOptions { RecurseSubdirectories = true })
                .FirstOrDefault(path => path.EndsWith(seedPathSearch), string.Empty);
            Console.WriteLine(seedPath);
            Assert.EndsWith("Cars.json", seedPath);
        }
    }
}
