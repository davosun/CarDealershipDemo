using System.Globalization;
using System.Text.Json.Serialization;

namespace CarDealershipDemo.Core.Models
{
    public class Car
    {
        private static readonly CultureInfo _culture = new("en-US");

        [JsonPropertyName("_id")]
        public string? Id { get; set; }
        public int Year { get; set; }
        public int Miles { get; set; }
        public string? DisplayMiles => Miles.ToString("N0", _culture);
        public required string Make { get; set; }
        public required string Color { get; set; }
        public string? ColorHexCode { get; set; }
        public decimal Price { get; set; }
        public string? DisplayPrice => Price.ToString("C", _culture);
        public bool HasSunroof { get; set; }
        public bool IsFourWheelDrive { get; set; }
        public bool HasPowerWindows { get; set; }
        public bool HasNavigation { get; set; }
        public bool HasHeatedSeats { get; set; }
        public bool? IsActive { get; set; }
    }
}
