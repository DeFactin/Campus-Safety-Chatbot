using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SafetyBotAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusSeverityCodes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Severity",
                table: "IncidentReports",
                newName: "SeverityCode");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "IncidentReports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "IncidentReports");

            migrationBuilder.RenameColumn(
                name: "SeverityCode",
                table: "IncidentReports",
                newName: "Severity");
        }
    }
}
