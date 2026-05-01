using CarDealershipDemo.Core.FilterArgs;
using CarDealershipDemo.Core.Models;

namespace CarDealershipDemo.Core.Services
{
    public interface ICarService
    {
        Task<Car> AddCarAsync(Car car, CancellationToken cancellationToken = default);
        Task<List<Car>> GetCarAsync(string carId, CancellationToken cancellationToken = default);
        Task<IEnumerable<Car>> GetCarsAsync(CarFilterArgs args, CancellationToken cancellationToken = default);
        ValueTask<int> SoftRemoveCarAsync(string carId, CancellationToken cancellationToken = default);
        Task<Car> UpdateCarAsync(string carId, Car car, CancellationToken cancellationToken = default);
    }
}
