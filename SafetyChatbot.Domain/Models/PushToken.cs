using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SafetyChatbot.Domain.Models
{
    public class PushToken
    {
        [Key]
        public string UserId { get; set; }  // Azure AD User

        public string Token { get; set; }

        public DateTime LastUpdated { get; set; }
    }

}
