namespace SafetyChatbot.Domain.Models;


public class ChatSession
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string UserIdentifier { get; set; } // Stores JWT's user ID (sub/NameIdentifier)
    public ICollection<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
}