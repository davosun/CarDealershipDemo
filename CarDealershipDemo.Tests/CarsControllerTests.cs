using CarDealershipDemo.Core.FilterArgs;
using CarDealershipDemo.Core.Models;
using CarDealershipDemo.Core.Services;
using CarDealershipDemo.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CarDealershipDemo.Tests
{
    [TestClass]
    public class CarsControllerTests
    {
        private static readonly CancellationToken _cancellationToken = CancellationToken.None;

        [TestMethod]
        public async Task OkResponse()
        {
            var mockService = new Mock<ICarService>();
            var argsStub = It.IsAny<CarFilterArgs>();
            var carStub = It.IsAny<Car>();
            mockService
                .Setup(svc => svc.GetCarsAsync(argsStub, _cancellationToken))
                .ReturnsAsync([carStub]);

            var controller = new CarsController(mockService.Object);
            var result = await controller.GetCarsAsync(argsStub, _cancellationToken);
            
            var okResult = Assert.IsInstanceOfType<OkObjectResult>(result);
            var cars = Assert.IsInstanceOfType<IEnumerable<Car>>(okResult.Value);
            Assert.HasCount(1, cars);
        }
    }
}
