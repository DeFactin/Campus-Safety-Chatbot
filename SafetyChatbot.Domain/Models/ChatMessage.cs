namespace SafetyChatbot.Domain.Models;

public class ChatMessage
{
    public int Id { get; set; }

    public int ChatSessionId { get; set; }  // Foreign key
    public ChatSession ChatSession { get; set; }  // Navigation property

    public string Message { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string Sender { get; set; }  // "user" or "bot"
}