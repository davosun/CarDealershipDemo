using CarDealershipDemo.WebApi;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CarDealershipDemo.Tests
{
    [TestClass]
    public class ParseTest
    {
        [TestMethod]
        public void ParseGuid()
        {
            var value = "59d2698c2eaefb1268b69ee5";
            var parsed = Guid.TryParse(value, out var result);
            Assert.IsFalse(parsed);
            Assert.AreEqual(Guid.Empty, result);
        }

        [TestMethod]
        public void ParseColorEnum()
        {
            var redValue = "red";
            var greenValue = "Green";
            var redParsed = Enum.TryParse<Color>(redValue, true, out var redResult);
            var greenParsed = Enum.TryParse<Color>(greenValue, true, out var greenResult);

            Assert.IsTrue(redParsed);
            Assert.IsFalse(greenParsed);
            Assert.AreEqual(Color.Red, redResult);
            Assert.AreEqual(Color.Red.ToString(), "Red");
            Assert.AreEqual(Color.Black, greenResult);
        }
    }
}
