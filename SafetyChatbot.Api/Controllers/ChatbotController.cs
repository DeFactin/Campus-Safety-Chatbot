using Microsoft.AspNetCore.Mvc;
using SafetyChatbot.Application.Services;
using SafetyChatbot.Application.Dtos;
using SafetyChatbot.Domain.Models;
using SafetyChatbot.Infrastructure.Repositories;

namespace SafetyChatbot.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatbotController : ControllerBase
    {
        private readonly IDialogflowService _dialogflow;
        private readonly IChatRepository _chatRepository;

        public ChatbotController(IDialogflowService dialogflow, IChatRepository chatRepository)
        {
            _dialogflow = dialogflow;
            _chatRepository = chatRepository;
        }

        [HttpPost("message")]
        public async Task<IActionResult> PostMessage([FromBody] ChatMessageDto dto)
        {
            var response = await _dialogflow.DetectIntentAsync(dto.SessionId, dto.Message);

            await _chatRepository.SaveMessageAsync(dto.SessionId, dto.Message, "user");
            await _chatRepository.SaveMessageAsync(dto.SessionId, response, "bot");

            return Ok(new { reply = response });
        }

        [HttpGet("history/{sessionId}")]
        public async Task<IActionResult> GetChatHistory(string sessionId)
        {
            var chatSession = await _chatRepository.GetChatSessionAsync(sessionId);
            if (chatSession == null)
                return NotFound();

            var history = chatSession.Messages.Select(m => new
            {
                m.Message,
                m.Sender,
                m.Timestamp
            });

            return Ok(history);
        }

        [HttpGet("sessions")]
        public async Task<IActionResult> GetChatSessions()
        {
            var sessions = await _chatRepository.GetAllChatSessionsAsync();

            var result = sessions.Select(session =>
                {
                    var firstMessage = session.Messages
                        .OrderBy(m => m.Timestamp)
                        .FirstOrDefault();

                    var lastMessage = session.Messages
                        .OrderByDescending(m => m.Timestamp)
                        .FirstOrDefault();

                    string title = firstMessage != null
                        ? (firstMessage.Message.Length > 25 ? firstMessage.Message.Substring(0, 25) + "..." : firstMessage.Message)
                        : "New Chat";

                    return new
                    {
                        id = session.SessionId,
                        title,
                        lastMessage = lastMessage?.Message ?? "",
                        timestamp = lastMessage?.Timestamp ?? session.CreatedAt,
                    };
                })
                .OrderByDescending(s => s.timestamp)
                .ToList();

            return Ok(result);
        }
    }
}
