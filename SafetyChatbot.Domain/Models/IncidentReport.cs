using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SafetyChatbot.Domain.Models
{

    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class IncidentReport
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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

       

        
    }

  
}

