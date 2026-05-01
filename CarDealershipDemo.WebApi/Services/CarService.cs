using CarDealershipDemo.Core.FilterArgs;
using CarDealershipDemo.Core.Lookups;
using CarDealershipDemo.Core.Models;
using CarDealershipDemo.Core.Repositories;
using CarDealershipDemo.Core.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace CarDealershipDemo.WebApi.Services
{
    public class CarService(ICarRepository carRepository) : ICarService
    {
        private readonly ICarRepository _carRepository = carRepository;

        private static readonly Expression<Func<Core.Entities.Car, Car>> _carProjection = car => new Car
        {
            Id = car.Id.ToString(),
            Make = car.Make,
            Year = car.Year,
            Miles = car.Miles,
            Color = Enum.GetName(car.Color),
            ColorHexCode = car.ColorHexCode,
            IsFourWheelDrive = car.Drivetrain == Drivetrain.FourWheel,
            HasNavigation = car.HasNavigation,
            HasHeatedSeats = car.HasHeatedSeats,
            HasPowerWindows = car.HasPowerWindows,
            HasSunroof = car.HasSunroof,
            Price = car.Price,
            IsActive = car.IsActive
        };

        public async Task<IEnumerable<Car>> GetCarsAsync(CarFilterArgs args, CancellationToken cancellationToken = default)
        {
            var cars = await _carRepository
                .QueryCars(args)
                .Select(_carProjection)
                .ToListAsync(cancellationToken);
            return cars;
        }

        public async Task<List<Car>> GetCarAsync(string carId, CancellationToken cancellationToken = default)
        {
            var cars = await _carRepository
                .QueryCar(carId)
                .Select(_carProjection)
                .ToListAsync(cancellationToken);
            return cars;
        }

        public async Task<Car> AddCarAsync(Car car, CancellationToken cancellationToken = default)
        {
            var newCar = await _carRepository.AddCarAsync(
                car.Make,
                car.Year,
                car.Miles,
                car.Price,
                car.Color,
                car.IsFourWheelDrive,
                car.HasPowerWindows,
                car.HasSunroof,
                car.HasNavigation,
                car.HasHeatedSeats,
                cancellationToken);
            car.Id = newCar.Id.ToString();
            car.IsActive = newCar.IsActive;
            return car;
        }

        public async Task<Car> UpdateCarAsync(string carId, Car car, CancellationToken cancellationToken = default)
        {
            await _carRepository.UpdateCarAsync(
                carId,
                car.Make,
                car.Year,
                car.Miles,
                car.Price,
                car.Color,
                car.IsFourWheelDrive,
                car.HasPowerWindows,
                car.HasSunroof,
                car.HasNavigation,
                car.HasHeatedSeats,
                cancellationToken);
            return car;
        }

        public async ValueTask<int> SoftRemoveCarAsync(string carId, CancellationToken cancellationToken = default)
        {
            var affectedCount = await _carRepository.SoftRemoveCarAsync(carId, cancellationToken);
            return affectedCount;
        }
    }
}
