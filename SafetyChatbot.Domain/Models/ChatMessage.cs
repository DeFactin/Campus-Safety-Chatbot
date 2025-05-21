namespace SafetyChatbot.Domain.Models;


public class ChatMessage
{
    public Guid Id { get; set; }
    public Guid SessionId { get; set; }
    public ChatSession Session { get; set; }
    public string Content { get; set; }
    public bool IsFromUser { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}