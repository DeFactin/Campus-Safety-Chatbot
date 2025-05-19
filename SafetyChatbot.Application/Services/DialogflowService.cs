using Google.Cloud.Dialogflow.V2;

namespace SafetyChatbot.Application.Services
{
    public class DialogflowService : IDialogflowService
    {
        private readonly SessionsClient _sessionsClient;
        private readonly string _projectId;

        public DialogflowService(string projectId)
        {
            _sessionsClient = SessionsClient.Create();  // Uses ADC automatically
            _projectId = projectId;
        }

        public async Task<string> DetectIntentAsync(string sessionId, string userMessage)
        {
            var sessionName = new SessionName(_projectId, sessionId);
            var queryInput = new QueryInput
            {
                Text = new TextInput
                {
                    Text = userMessage,
                    LanguageCode = "en"
                }
            };

            var response = await _sessionsClient.DetectIntentAsync(sessionName, queryInput);
            return response.QueryResult.FulfillmentText;
        }
    }
}