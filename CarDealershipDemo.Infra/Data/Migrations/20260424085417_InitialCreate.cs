using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarDealershipDemo.Infra.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "car",
                schema: "dbo",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    created_dt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getutcdate()"),
                    modified_dt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getutcdate()"),
                    active_in = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "1"),
                    mfr_nm = table.Column<string>(type: "varchar(50)", nullable: false),
                    model_yr = table.Column<int>(type: "int", nullable: false),
                    color_nm = table.Column<string>(type: "varchar(10)", nullable: false),
                    color_hex_cd = table.Column<string>(type: "char(7)", nullable: false),
                    mileage_qty = table.Column<int>(type: "int", nullable: false),
                    price_amt = table.Column<decimal>(type: "money", nullable: false),
                    drivetrain_cd = table.Column<string>(type: "char(3)", nullable: false),
                    sunroof_in = table.Column<bool>(type: "bit", nullable: false),
                    power_windows_in = table.Column<bool>(type: "bit", nullable: false),
                    navigation_in = table.Column<bool>(type: "bit", nullable: false),
                    heated_seats_in = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_car", x => x.id)
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateIndex(
                name: "IX_car_created_dt_id",
                schema: "dbo",
                table: "car",
                columns: new[] { "created_dt", "id" })
                .Annotation("SqlServer:Clustered", true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "car",
                schema: "dbo");
        }
    }
}
