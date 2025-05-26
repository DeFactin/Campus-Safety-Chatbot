using Microsoft.EntityFrameworkCore;
using SafetyChatbot.Domain.Models;

namespace SafetyChatbot.Infrastructure.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly ApplicationDbContext _context;

        public ChatRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ChatSession> GetChatSessionAsync(string sessionId)
        {
            return await _context.ChatSessions
                .Include(cs => cs.Messages.OrderBy(m => m.Timestamp))
                .FirstOrDefaultAsync(cs => cs.SessionId == sessionId);
        }

        public async Task SaveMessageAsync(string sessionId, string messageText, string sender)
        {
            var chatSession = await _context.ChatSessions
                .FirstOrDefaultAsync(cs => cs.SessionId == sessionId);

            if (chatSession == null)
            {
                chatSession = new ChatSession
                {
                    SessionId = sessionId,
                    CreatedAt = DateTime.UtcNow
                };
                _context.ChatSessions.Add(chatSession);
                await _context.SaveChangesAsync(); // Ensure ID is generated
            }

            var chatMessage = new ChatMessage
            {
                ChatSessionId = chatSession.Id,
                Message = messageText,
                Sender = sender,
                Timestamp = DateTime.UtcNow
            };

            _context.ChatMessages.Add(chatMessage);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ChatSession>> GetAllChatSessionsAsync()
        {
            return await _context.ChatSessions
                .Include(cs => cs.Messages)
                .ToListAsync();
        }
    }
}