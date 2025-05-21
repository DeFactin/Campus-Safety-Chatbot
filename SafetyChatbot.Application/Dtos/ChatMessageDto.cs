using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SafetyChatbot.Application.Dtos
{
    public class ChatMessageDto
    {
        public string? SessionId { get; set; }
        public string? Message { get; set; }
    }
}