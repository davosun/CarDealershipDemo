using CarDealershipDemo.Core.Entities;
using CarDealershipDemo.Core.Lookups;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace CarDealershipDemo.Infra.Data
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Car> Cars { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("dbo");

            modelBuilder.Entity<Car>()
                .ToTable("car")
                .HasKey(c => c.Id)
                .IsClustered(false);

            modelBuilder.Entity<Car>()
                .Property(c => c.Id)
                .HasColumnName("id");

            var dtProp = modelBuilder.Entity<Car>()
                .Property(c => c.CreatedDate)
                .HasColumnName("created_dt")
                .HasDefaultValueSql("current_timestamp")
                .ValueGeneratedOnAdd();
            dtProp.Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Ignore);
            dtProp.Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            dtProp = modelBuilder.Entity<Car>()
                .Property(c => c.ModifiedDate)
                .HasColumnName("modified_dt")
                .HasDefaultValueSql("current_timestamp")
                .ValueGeneratedOnAddOrUpdate();
            dtProp.Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Ignore);
            dtProp.Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            modelBuilder.Entity<Car>()
                .Property(c => c.IsActive)
                .HasColumnName("active_in")
                .HasDefaultValueSql("1")
                .ValueGeneratedOnAdd()
                .Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Ignore);

            modelBuilder.Entity<Car>()
                .Property(c => c.Year)
                .HasColumnName("model_yr");

            modelBuilder.Entity<Car>()
                .Property(c => c.Make)
                .HasColumnName("mfr_nm")
                .HasColumnType("varchar(50)");

            modelBuilder.Entity<Car>()
                .Property(c => c.Color)
                .HasColumnName("color_nm")
                .HasColumnType("varchar(10)")
                .HasConversion<string>();

            modelBuilder.Entity<Car>()
                .Property(c => c.ColorHexCode)
                .HasColumnName("color_hex_cd")
                .HasColumnType("char(7)")
                .HasField("_colorHexCode");

            modelBuilder.Entity<Car>()
                .Property(c => c.Miles)
                .HasColumnName("mileage_qty");

            modelBuilder.Entity<Car>()
                .Property(c => c.Price)
                .HasColumnName("price_amt")
                .HasColumnType("money");

            modelBuilder.Entity<Car>()
                .Property(c => c.Drivetrain)
                .HasColumnName("drivetrain_cd")
                .HasColumnType("char(3)")
                .HasConversion(
                    d => d == Drivetrain.FourWheel ? "4WD" : "2WD",
                    d => d == "4WD" ? Drivetrain.FourWheel : Drivetrain.TwoWheel);

            modelBuilder.Entity<Car>()
                .Property(c => c.HasSunroof)
                .HasColumnName("sunroof_in");

            modelBuilder.Entity<Car>()
                .Property(c => c.HasPowerWindows)
                .HasColumnName("power_windows_in");

            modelBuilder.Entity<Car>()
                .Property(c => c.HasNavigation)
                .HasColumnName("navigation_in");

            modelBuilder.Entity<Car>()
                .Property(c => c.HasHeatedSeats)
                .HasColumnName("heated_seats_in");

            modelBuilder.Entity<Car>()
                .HasIndex(c => new { c.CreatedDate, c.Id })
                .IsClustered();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var currentDirectory = Directory.GetCurrentDirectory();
            var seedPathSearch = Path.Combine("Data", "Seed", "Cars.json");
            var seedPath = Directory.EnumerateFiles(currentDirectory, "*", new EnumerationOptions { RecurseSubdirectories = true })
                .FirstOrDefault(dir => dir.EndsWith(seedPathSearch), string.Empty);
            optionsBuilder.UseSeeding((db, _) =>
            {
                using var stream = new FileStream(
                    seedPath,
                    FileMode.Open,
                    FileAccess.Read,
                    FileShare.Read);
                var cars = JsonSerializer.Deserialize<IEnumerable<Core.Models.Car>>(stream, jsonOptions) ?? [];
                foreach (var dto in cars)
                {
                    var idData = Encoding.UTF8.GetBytes(dto.Id!);
                    var hash = MD5.HashData(idData);
                    var id = new Guid(hash);
                    var exists = db.Set<Car>().Any(c => c.Id == id);
                    if (!exists)
                    {
                        var car = CarFactory.Create(
                            dto.Make,
                            dto.Year,
                            Enum.Parse<Color>(dto.Color),
                            dto.Miles,
                            dto.Price,
                            dto.IsFourWheelDrive ? Drivetrain.FourWheel : Drivetrain.TwoWheel,
                            dto.HasSunroof,
                            dto.HasPowerWindows,
                            dto.HasNavigation,
                            dto.HasHeatedSeats);
                        car.Id = id;

                        db.Set<Car>().Add(car);
                        db.SaveChanges();
                    }
                }
            }).UseAsyncSeeding(async (db, _, cancellationToken) =>
            {
                using var stream = new FileStream(
                    seedPath,
                    FileMode.Open,
                    FileAccess.Read,
                    FileShare.Read);
                var cars = await JsonSerializer.DeserializeAsync<IEnumerable<Core.Models.Car>>(stream, jsonOptions, cancellationToken) ?? [];
                foreach (var dto in cars)
                {
                    var idData = Encoding.UTF8.GetBytes(dto.Id!);
                    var hash = MD5.HashData(idData);
                    var id = new Guid(hash);
                    var exists = await db.Set<Car>().AnyAsync(c => c.Id == id, cancellationToken);
                    if (!exists)
                    {
                        var car = CarFactory.Create(
                            dto.Make,
                            dto.Year,
                            Enum.Parse<Color>(dto.Color),
                            dto.Miles,
                            dto.Price,
                            dto.IsFourWheelDrive ? Drivetrain.FourWheel : Drivetrain.TwoWheel,
                            dto.HasSunroof,
                            dto.HasPowerWindows,
                            dto.HasNavigation,
                            dto.HasHeatedSeats);
                        await db.Set<Car>().AddAsync(car, cancellationToken);
                        await db.SaveChangesAsync(cancellationToken);
                    }
                }
            });
        }
    }
}
