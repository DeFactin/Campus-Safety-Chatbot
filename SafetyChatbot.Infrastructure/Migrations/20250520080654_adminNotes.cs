using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SafetyBotAPI.Migrations
{
    /// <inheritdoc />
    public partial class adminNotes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminNotes",
                table: "IncidentReports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminNotes",
                table: "IncidentReports");
        }
    }
}
