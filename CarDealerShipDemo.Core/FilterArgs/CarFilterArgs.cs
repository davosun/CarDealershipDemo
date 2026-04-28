namespace CarDealershipDemo.Core.FilterArgs
{
    public class CarFilterArgs
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 25;
        public int LowMileageThreshold { get; set; } = 25000;
        public bool StrictSearch { get; set; }
        public bool? IsFourWheelDrive { get; set; }
        public bool? HasLowMiles { get; set; }
        public bool? HasPowerWindows { get; set; }
        public bool? HasSunroof { get; set; }
        public bool? HasNavigation { get; set; }
        public bool? HasHeatedSeats { get; set; }
        public string? Color { get; set; }
    }
}
