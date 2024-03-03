using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRental.Migrations
{
    /// <inheritdoc />
    public partial class FixedRental : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentals_Users_AcceptingEmployeeId",
                table: "Rentals");

            migrationBuilder.AlterColumn<string>(
                name: "Comments",
                table: "Rentals",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<Guid>(
                name: "AcceptingEmployeeId",
                table: "Rentals",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_Users_AcceptingEmployeeId",
                table: "Rentals",
                column: "AcceptingEmployeeId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.RenameColumn(
                name: "NetAmount",
                table: "Rentals",
                newName: "NetAmountWithoutDiscount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rentals_Users_AcceptingEmployeeId",
                table: "Rentals");

            migrationBuilder.AlterColumn<string>(
                name: "Comments",
                table: "Rentals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "AcceptingEmployeeId",
                table: "Rentals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Rentals_Users_AcceptingEmployeeId",
                table: "Rentals",
                column: "AcceptingEmployeeId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameColumn(
                name: "NetAmountWithoutDiscount",
                table: "Rentals",
                newName: "NetAmount");
        }
    }
}
