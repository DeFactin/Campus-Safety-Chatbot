using SafetyChatbot.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SafetyChatbot.Application.Dtos
{
    public class IncidentReportDto
    {
        public int Id { get; set; }

        public string ReportedBy { get; set; }

        [Required]
        public string IncidentType { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public string Severity { get; set; }

        public DateTime LastUpdated { get; set; }

        public string? AdminNotes { get; set; }

        public string? FilePath { get; set; }

    }
}
