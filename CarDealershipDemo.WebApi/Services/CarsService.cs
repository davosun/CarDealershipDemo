using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
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

        Task<IEnumerable<Car>> GetAllCarsAsync(int page, int pageSize, CancellationToken cancellationToken = default);
        Task<Car> GetCarAsync(string id, CancellationToken cancellationToken = default);
        Task<IEnumerable<Car>> GetFilteredCarsAsync(string color, bool? hasSunroof, bool? isFourWheelDrive, bool? hasLowMiles, bool? hasPowerWindows, bool? hasNavigation, bool? hasHeatedSeats, int? mileageThreshold, bool meetAllCriteria, int page, int pageSize, CancellationToken cancellationToken = default);
    }

    public class CarsService : ICarsService
    {
        private static readonly JsonSerializerOptions _jsonOptions = new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        private static readonly ConcurrentDictionary<string, Car> _cars = new();
        private readonly ILogger<CarsService> _logger;

        public int DefaultMileageThreshold { get; }

        public CarsService(IConfiguration configuration, ILogger<CarsService> logger)
        {
            DefaultMileageThreshold = int.Parse(configuration["DefaultMileageThreshold"]);
            _logger = logger;
        }

        public async Task<IEnumerable<Car>> GetAllCarsAsync(int page, int pageSize, CancellationToken cancellationToken = default)
        {
            var cars = !_cars.IsEmpty
                ? _cars.Select(c => c.Value)
                : [];
            if (_cars.IsEmpty)
            {
                try
                {
                    await using var stream = new FileStream("Cars.json", FileMode.Open);

                    cars = await JsonSerializer.DeserializeAsync<IEnumerable<Car>>(stream, _jsonOptions, cancellationToken);
                    foreach (var car in cars)
                    {
                        car.AssignColorCode();
                        _cars.TryAdd(car.Id, car);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, ex.Message);
                }
            }

            cars = cars
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .OrderByDescending(car => car.Year)
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
            bool strictSearch,
            int page,
            int pageSize,
            CancellationToken cancellationToken = default)
        {
            // When working with a database, filtering would be performed at the query level to avoid an excessive payload.
            var cars = await GetAllCarsAsync(page, pageSize, cancellationToken);
            mileageThreshold ??= DefaultMileageThreshold;

            if (string.IsNullOrEmpty(color)
                && !hasSunroof.HasValue
                && !hasLowMiles.HasValue
                && !hasPowerWindows.HasValue
                && !hasNavigation.HasValue
                && !hasHeatedSeats.HasValue
                && !isFourWheelDrive.HasValue)
            {
                return cars;
            }

            if (strictSearch)
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
                    => (!string.IsNullOrEmpty(color) && car.Color == color)
                    || (hasSunroof.HasValue && car.HasSunroof == hasSunroof)
                    || (isFourWheelDrive.HasValue && car.IsFourWheelDrive == isFourWheelDrive)
                    || (hasLowMiles.HasValue && car.Miles <= mileageThreshold)
                    || (hasPowerWindows.HasValue && car.HasPowerWindows == hasPowerWindows)
                    || (hasNavigation.HasValue && car.HasNavigation == hasNavigation)
                    || (hasHeatedSeats.HasValue && car.HasHeatedSeats == hasHeatedSeats));
            }

            return cars;
        }

        public async Task<Car> GetCarAsync(string id, CancellationToken cancellationToken = default)
        {
            var cars = await GetAllCarsAsync(1, 50, cancellationToken);
            var car = cars.SingleOrDefault(car => car.Id == id);
            return car;
        }
    }
}
