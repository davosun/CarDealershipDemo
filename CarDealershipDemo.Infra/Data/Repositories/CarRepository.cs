using CarDealershipDemo.Core.Entities;
using CarDealershipDemo.Core.FilterArgs;
using CarDealershipDemo.Core.Lookups;
using CarDealershipDemo.Core.Repositories;

namespace CarDealershipDemo.Infra.Data.Repositories
{
    public class CarRepository(AppDbContext db) : ICarRepository
    {
        private readonly AppDbContext _db = db;

        public IQueryable<Car> QueryCars(CarFilterArgs args)
        {                    
            var query = _db.Cars.Where(car => car.IsActive);
            if (string.IsNullOrWhiteSpace(args.Color)
                && !args.HasSunroof.HasValue
                && !args.HasLowMiles.HasValue
                && !args.HasPowerWindows.HasValue
                && !args.HasNavigation.HasValue
                && !args.HasHeatedSeats.HasValue
                && !args.IsFourWheelDrive.HasValue)
            {
                query = query.SortAndPaginate(args.Page, args.PageSize);
                return query;
            }

            var validColor = Enum.TryParse<Color>(args.Color, out var color);
            if (args.StrictSearch)
            {
                query = query.Where(car
                    => (!validColor || car.Color == color)
                    && (!args.HasSunroof.HasValue || car.HasSunroof == args.HasSunroof)
                    && (!args.IsFourWheelDrive.HasValue || (args.IsFourWheelDrive.Value ? car.Drivetrain == Drivetrain.FourWheel : car.Drivetrain == Drivetrain.TwoWheel))
                    && (!args.HasLowMiles.HasValue || car.Miles <= args.LowMileageThreshold)
                    && (!args.HasPowerWindows.HasValue || car.HasPowerWindows == args.HasPowerWindows)
                    && (!args.HasNavigation.HasValue || car.HasNavigation == args.HasNavigation)
                    && (!args.HasHeatedSeats.HasValue || car.HasHeatedSeats == args.HasHeatedSeats));
            }
            else
            {
                query = query.Where(car
                    => (validColor && car.Color == color)
                    || (args.HasSunroof.HasValue && car.HasSunroof == args.HasSunroof)
                    || (args.IsFourWheelDrive.HasValue && (args.IsFourWheelDrive.Value ? car.Drivetrain == Drivetrain.FourWheel : car.Drivetrain == Drivetrain.TwoWheel))
                    || (args.HasLowMiles.HasValue && car.Miles <= args.LowMileageThreshold)
                    || (args.HasPowerWindows.HasValue && car.HasPowerWindows == args.HasPowerWindows)
                    || (args.HasNavigation.HasValue && car.HasNavigation == args.HasNavigation)
                    || (args.HasHeatedSeats.HasValue && car.HasHeatedSeats == args.HasHeatedSeats));
            }

            query = query.SortAndPaginate(args.Page, args.PageSize);
            return query;
        }
    }
}
