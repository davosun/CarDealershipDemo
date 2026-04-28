using CarDealershipDemo.Core.Entities;
using CarDealershipDemo.Core.FilterArgs;

namespace CarDealershipDemo.Core.Repositories
{
    public interface ICarRepository
    {
        IQueryable<Car> QueryCars(CarFilterArgs args);
    }
}
