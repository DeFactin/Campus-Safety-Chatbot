using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SafetyBotAPI.Migrations
{
    /// <inheritdoc />
    public partial class severity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SeverityCode",
                table: "IncidentReports",
                newName: "SeverityLevel");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SeverityLevel",
                table: "IncidentReports",
                newName: "SeverityCode");
        }
    }
}
