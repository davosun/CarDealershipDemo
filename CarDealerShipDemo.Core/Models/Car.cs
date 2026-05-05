using CarDealershipDemo.Core.Lookups;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Text.Json.Serialization;

namespace CarDealershipDemo.Core.Models
{
    public class Car
    {
        private static readonly CultureInfo _culture = new("en-US");

        [JsonPropertyName("_id")]
        public string? Id { get; set; }
        [Range(1970, 9999)]
        public int Year { get; set; }
        [Range(0, 999_999)]
        public int Miles { get; set; }
        public string? DisplayMiles => Miles.ToString("N0", _culture);
        [MinLength(1), MaxLength(50)]
        public required string Make { get; set; }
        [AllowedValues("Black", "Gray", "Silver", "White", "Red", "Green", "Blue", "Yellow",
            "black", "gray", "silver", "white", "red", "green", "blue", "yellow")]
        public required string Color { get; set; }
        public string? ColorHexCode
        {
            get
            {
                var isValid = Enum.TryParse<Color>(Color, ignoreCase: true, out var color);
                if (!isValid)
                {
                    return string.Empty;
                }

                var hexCode = $"#{(int)color:X6}";
                return hexCode;
            }
        }
        [Range(0.00, 999_999_999.00)]
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
