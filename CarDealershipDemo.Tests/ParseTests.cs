using CarDealershipDemo.Core.Lookups;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Security.Cryptography;

namespace CarDealershipDemo.Tests
{
    [TestClass]
    public class ParseTests
    {
        [TestMethod]
        public void ParseGuid()
        {
            var value = "59d2698c2eaefb1268b69ee5";
            var parsed = Guid.TryParse(value, out var result);
            Assert.IsFalse(parsed);
            Assert.AreEqual(Guid.Empty, result);

            var source = System.Text.Encoding.UTF8.GetBytes(value);
            var hash = MD5.HashData(source);
            result = new Guid(hash);
            Console.WriteLine(result);
        }

        [TestMethod]
        public void ParseColorEnum()
        {
            var redValue = "red";
            var orangeValue = "Orange";
            var redParsed = Enum.TryParse<Color>(redValue, true, out var redResult);
            var orangeParsed = Enum.TryParse<Color>(orangeValue, true, out var orangeResult);

            Assert.IsTrue(redParsed);
            Assert.IsFalse(orangeParsed);
            Assert.AreEqual(Color.Red, redResult);
            Assert.AreEqual("Red", redResult.ToString());
            Assert.AreEqual("FF0000", ((int)redResult).ToString("X6"));
            Assert.AreEqual(Color.Black, orangeResult);
            Assert.AreEqual("Black", orangeResult.ToString());
            Assert.AreEqual("000000", ((int)orangeResult).ToString("X6"));
        }
    }
}
