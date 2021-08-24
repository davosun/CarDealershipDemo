using CarDealershipDemo.WebApi.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Text.Json.Serialization;

namespace CarDealershipDemo.WebApi
{
    public class Car
    {
        [JsonPropertyName("_id")]
        public string Id { get; set; }
        public int Year { get; set; }
        public int Miles { get; set; }
        public string Make { get; set; }
        public string Color { get; set; }
        public Color ColorCode { get; set; }
        public int Price { get; set; }
        public bool HasSunroof { get; set; }
        public bool IsFourWheelDrive { get; set; }
        public bool HasPowerWindows { get; set; }
        public bool HasNavigation { get; set; }
        public bool HasHeatedSeats { get; set; }

        public void AssignColorCode()
        {
            var parsed = Enum.TryParse<Color>(Color, true, out var result);
            ColorCode = parsed ? result : WebApi.Color.Black;
        }
    }

    public enum Color
    {
        Black = 0x000000,
        White = 0xFFFFFF,
        Red = 0xFF0000,
        Silver = 0xC0C0C0,
        Gray = 0x808080,
    }
}
