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

        public IQueryable<Car> QueryCar(string carId)
        {
            var query = _db.Cars.Where(c => c.Id == Guid.Parse(carId));
            return query;
        } 

        public async Task<Car> AddCarAsync(
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
            CancellationToken cancellationToken = default)
        {
            var car = CarFactory.Create(
                make,
                year,
                Enum.Parse<Color>(color),
                miles,
                price,
                isFourWheelDrive ? Drivetrain.FourWheel : Drivetrain.TwoWheel,
                hasSunroof,
                hasPowerWindows,
                hasNavigation,
                hasHeatedSeats);
            await _db.Cars.AddAsync(car, cancellationToken);
            await _db.SaveChangesAsync(cancellationToken);
            return car;
        }

        public async Task<Car> UpdateCarAsync(
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
            CancellationToken cancellationToken = default)
        {
            var car = new Car
            {
                Id = Guid.Parse(carId),
                IsActive = true,
                Make = string.Empty
            };
            _db.Cars.Attach(car);

            car.Make = make;
            car.Year = year;
            car.Miles = miles;
            car.Price = price;
            car.Color = Enum.Parse<Color>(color);
            car.Drivetrain = isFourWheelDrive ? Drivetrain.FourWheel : Drivetrain.TwoWheel;
            car.HasPowerWindows = hasPowerWindows;
            car.HasSunroof = hasSunroof;
            car.HasNavigation = hasNavigation;
            car.HasHeatedSeats = hasHeatedSeats;
            await _db.SaveChangesAsync(cancellationToken);
            return car; 
        }

        public async ValueTask<int> SoftRemoveCarAsync(string id, CancellationToken cancellationToken = default)
        {
            var car = new Car
            {
                Id = Guid.Parse(id),
                Make = string.Empty,
                IsActive = true
            };
            _db.Cars.Attach(car);

            car.IsActive = false;
            
            var affectedCount = await _db.SaveChangesAsync(cancellationToken);
            return affectedCount;
        }
    }
}
