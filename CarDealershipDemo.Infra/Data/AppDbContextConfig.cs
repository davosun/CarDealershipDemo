using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CarDealershipDemo.Infra.Data
{
    public static class AppDbContextConfig
    {
        public static void AddAppDbContext(this IServiceCollection services, string connectionString) 
            => services.AddDbContext<AppDbContext>(options 
                => options.UseAzureSql(connectionString, opt => opt.CommandTimeout(60)));
    }
}
