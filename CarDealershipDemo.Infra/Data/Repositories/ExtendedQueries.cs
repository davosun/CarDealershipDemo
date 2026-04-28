using CarDealershipDemo.Core.Entities;

namespace CarDealershipDemo.Infra.Data.Repositories
{
    public static class ExtendedQueries
    {
        public static IQueryable<Car> SortAndPaginate(this IQueryable<Car> query, int page, int pageSize)
            => query
                .OrderByDescending(car => car.Year)
                .ThenBy(car => car.Miles)
                .ThenBy(car => car.Price)
                .ThenBy(car => car.Make)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
    }
}
