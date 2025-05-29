namespace SafetyChatbot.Domain.Models;

public class ChatSession
{
    public int Id { get; set; }
    public string SessionId { get; set; } = Guid.NewGuid().ToString();
    public DateTime CreatedAt { get; set; }
    public List<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    
   
}