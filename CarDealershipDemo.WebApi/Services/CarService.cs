using CarDealershipDemo.Core.FilterArgs;
using CarDealershipDemo.Core.Lookups;
using CarDealershipDemo.Core.Models;
using CarDealershipDemo.Core.Repositories;
using CarDealershipDemo.Core.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CarDealershipDemo.WebApi.Services
{
    public class CarService(ICarRepository carRepository) : ICarService
    {
        private readonly ICarRepository _carRepository = carRepository;

        public async Task<IEnumerable<Car>> GetCarsAsync(CarFilterArgs args, CancellationToken cancellationToken = default)
        {
            var cars = await _carRepository
                .QueryCars(args)
                .Select(car => new Car
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
                })
                .ToListAsync(cancellationToken);
            return cars;
        }
    }
}
