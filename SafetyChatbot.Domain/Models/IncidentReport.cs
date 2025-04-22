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

        [Required]
        public string IncidentType { get; set; }

        [Required]
        public string Status { get; set; }  // Numeric field for API input

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        public SeverityLevel  SeverityCode { get; set; }  // Numeric field for API input

       

        
    }

    public enum SeverityLevel
    {
        Low = 0,    
        Medium = 1, 
        High = 2    
    }

    /*public enum Status
    {
        Pending = 0,    
        InProgress = 1,  
        Resolved = 2    
    }*/
}

