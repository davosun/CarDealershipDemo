using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace CarDealershipDemo.WebApi.Services
{
    public interface ICarsService
    {
        int DefaultMileageThreshold { get; }

        Task<IEnumerable<Car>> GetAllCarsAsync(CancellationToken cancellationToken = default);
        Task<Car> GetCarAsync(string id, CancellationToken cancellationToken = default);
        Task<IEnumerable<Car>> GetFilteredCarsAsync(string color, bool? hasSunroof, bool? isFourWheelDrive, bool? hasLowMiles, bool? hasPowerWindows, bool? hasNavigation, bool? hasHeatedSeats, int? mileageThreshold, bool meetAllCriteria, CancellationToken cancellationToken = default);
    }

    public class CarsService : ICarsService
    {
        private static readonly JsonSerializerOptions _jsonOptions = new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        public int DefaultMileageThreshold { get; }

        public CarsService(IConfiguration configuration)
        {
            DefaultMileageThreshold = int.Parse(configuration["DefaultMileageThreshold"]);
        }

        public async Task<IEnumerable<Car>> GetAllCarsAsync(CancellationToken cancellationToken = default)
        {
            await using var stream = new FileStream("Cars.json", FileMode.Open);
            var cars = await JsonSerializer.DeserializeAsync<IEnumerable<Car>>(stream, _jsonOptions, cancellationToken);
            cars = cars.OrderByDescending(car => car.Year)
                .ThenBy(car => car.Miles)
                .ThenBy(car => car.Price)
                .ThenBy(car => car.Make);
            return cars;
        }

        public async Task<IEnumerable<Car>> GetFilteredCarsAsync(
            string color,
            bool? hasSunroof,
            bool? isFourWheelDrive,
            bool? hasLowMiles,
            bool? hasPowerWindows,
            bool? hasNavigation,
            bool? hasHeatedSeats,
            int? mileageThreshold,
            bool meetAllCriteria,
            CancellationToken cancellationToken = default)
        {
            var cars = await GetAllCarsAsync(cancellationToken);
            mileageThreshold ??= DefaultMileageThreshold;

            if (meetAllCriteria)
            {
                cars = cars.Where(car
                    => (string.IsNullOrEmpty(color) || car.Color == color)
                    && (!hasSunroof.HasValue || car.HasSunroof == hasSunroof)
                    && (!isFourWheelDrive.HasValue || car.IsFourWheelDrive == isFourWheelDrive)
                    && (!hasLowMiles.HasValue || car.Miles <= mileageThreshold)
                    && (!hasPowerWindows.HasValue || car.HasPowerWindows == hasPowerWindows)
                    && (!hasNavigation.HasValue || car.HasNavigation == hasNavigation)
                    && (!hasHeatedSeats.HasValue || car.HasHeatedSeats == hasHeatedSeats));
            }
            else
            {
                cars = cars.Where(car
                    => (string.IsNullOrEmpty(color) || car.Color == color)
                    || (!hasSunroof.HasValue || car.HasSunroof == hasSunroof)
                    || (!isFourWheelDrive.HasValue || car.IsFourWheelDrive == isFourWheelDrive)
                    || (!hasLowMiles.HasValue || car.Miles <= mileageThreshold)
                    || (!hasPowerWindows.HasValue || car.HasPowerWindows == hasPowerWindows)
                    || (!hasNavigation.HasValue || car.HasNavigation == hasNavigation)
                    || (!hasHeatedSeats.HasValue || car.HasHeatedSeats == hasHeatedSeats));
            }

            return cars;
        }

        public async Task<Car> GetCarAsync(string id, CancellationToken cancellationToken = default)
        {
            var cars = await GetAllCarsAsync(cancellationToken);
            var car = cars.SingleOrDefault(car => car.Id == id);
            return car;
        }
    }
}
