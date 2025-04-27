using SafetyChatbot.Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SafetyChatbot.Application.Dtos
{
    public class SubmitIncidentReportDto
    {

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
        public string SeverityCode { get; set; }

    }
}
