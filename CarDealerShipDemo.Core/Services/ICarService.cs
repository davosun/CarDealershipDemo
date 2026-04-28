using CarDealershipDemo.Core.FilterArgs;
using CarDealershipDemo.Core.Models;

namespace CarDealershipDemo.Core.Services
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetCarsAsync(CarFilterArgs args, CancellationToken cancellationToken = default);
    }
}
