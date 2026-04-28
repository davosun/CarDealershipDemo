using CarDealershipDemo.Core.Lookups;

namespace CarDealershipDemo.Core.Entities
{
    public static class CarFactory
    {
        public static Car Create(
            string make,
            int year,
            Color color,
            int miles,
            decimal price,
            Drivetrain drivetrain,
            bool hasSunroof,
            bool hasPowerWindows,
            bool hasNavigation,
            bool hasHeatedSeats)
        {
            return new()
            {
                Make = make,
                Year = year,
                Color = color,
                Miles = miles,
                Price = price,
                Drivetrain = drivetrain,
                HasSunroof = hasSunroof,
                HasPowerWindows = hasPowerWindows,
                HasNavigation = hasNavigation,
                HasHeatedSeats = hasHeatedSeats
            };
        }
    }
}
