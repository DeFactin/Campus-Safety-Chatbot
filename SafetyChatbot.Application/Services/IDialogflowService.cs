namespace SafetyChatbot.Application.Services
{
    public interface IDialogflowService
    {
        Task<string> DetectIntentAsync(string sessionId, string userMessage);
        
    }
}