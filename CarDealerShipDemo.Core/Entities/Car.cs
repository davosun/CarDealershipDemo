using CarDealershipDemo.Core.Lookups;
using System.Diagnostics.CodeAnalysis;

namespace CarDealershipDemo.Core.Entities
{
    public class Car : IEntity
    {
        private string _colorHexCode = "000000";

        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public required string Make { get; set; }
        public int Year { get; set; }
        public Color Color { 
            get;
            set
            {
                field = value;
                _colorHexCode = $"#{(int)value:X6}";
            }
        }
        public string ColorHexCode => _colorHexCode;
        public int Miles { get; set; }
        public decimal Price { get; set; }
        public Drivetrain Drivetrain { get; set; }
        public bool HasSunroof { get; set; }
        public bool HasPowerWindows { get; set; }
        public bool HasNavigation { get; set; }
        public bool HasHeatedSeats { get; set; }
    }
}
