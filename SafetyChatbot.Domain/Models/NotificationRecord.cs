using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SafetyChatbot.Domain.Models
{
    public class NotificationRecord
    {
        public int Id { get; set; }
        public string UserId { get; set; } // preferred_username iz tokena
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime ReceivedAt { get; set; } = DateTime.UtcNow;
        public bool IsRead { get; set; } = false;
    }
}
