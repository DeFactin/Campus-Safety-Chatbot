using Microsoft.AspNetCore.Mvc;
using SafetyChatbot.Application.Services; 
using SafetyChatbot.Application.Dtos;

namespace SafetyChatbot.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatbotController : ControllerBase
    {
        private readonly IDialogflowService _dialogflow;

        public ChatbotController(IDialogflowService dialogflow)
        {
            _dialogflow = dialogflow;
        }

        [HttpPost("message")]
        public async Task<IActionResult> PostMessage([FromBody] ChatMessageDto dto)
        {
            var response = await _dialogflow.DetectIntentAsync(dto.SessionId, dto.Message);
            return Ok(new { reply = response });
        }
    }
}