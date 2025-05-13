using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SafetyBotAPI.Migrations
{
    /// <inheritdoc />
    public partial class severity2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SeverityLevel",
                table: "IncidentReports",
                newName: "Severity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Severity",
                table: "IncidentReports",
                newName: "SeverityLevel");
        }
    }
}
