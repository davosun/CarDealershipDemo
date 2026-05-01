using CarDealershipDemo.Core.Entities;
using CarDealershipDemo.Core.FilterArgs;

namespace CarDealershipDemo.Core.Repositories
{
    public interface ICarRepository
    {
        Task<Car> AddCarAsync(
            string make,
            int year,
            int miles,
            decimal price,
            string color,
            bool isFourWheelDrive,
            bool hasPowerWindows,
            bool hasSunroof,
            bool hasNavigation,
            bool hasHeatedSeats,
            CancellationToken cancellationToken = default);
        IQueryable<Car> QueryCar(string carId);
        IQueryable<Car> QueryCars(CarFilterArgs args);
        ValueTask<int> SoftRemoveCarAsync(string carId, CancellationToken cancellationToken = default);
        Task<Car> UpdateCarAsync(
            string carId,
            string make,
            int year,
            int miles,
            decimal price,
            string color,
            bool isFourWheelDrive,
            bool hasPowerWindows,
            bool hasSunroof,
            bool hasNavigation,
            bool hasHeatedSeats,
            CancellationToken cancellationToken = default);
    }
}
