using SafetyChatbot.Domain.Models;

namespace SafetyChatbot.Infrastructure.Repositories;

public interface IChatRepository
{
    Task<ChatSession> GetChatSessionAsync(string sessionId);
    Task SaveMessageAsync(string sessionId, string messageText, string sender);
    Task<List<ChatSession>> GetAllChatSessionsAsync();
}