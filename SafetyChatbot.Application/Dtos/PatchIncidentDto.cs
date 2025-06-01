using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SafetyChatbot.Application.Dtos
{
    public class PatchIncidentDto
    {
       
            public string? ReportedBy { get; set; }
            public string? IncidentType { get; set; }
            public string? Status { get; set; }
            public string? Description { get; set; }
            public DateTime? Date { get; set; }
            public string? Location { get; set; }
            public string? Severity { get; set; }
            public DateTime? LastUpdated { get; set; }
            public string? AdminNotes { get; set; }
        

    }
}
