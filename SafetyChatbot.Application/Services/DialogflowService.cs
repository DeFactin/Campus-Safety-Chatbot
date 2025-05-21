using Google.Cloud.Dialogflow.V2Beta1;

namespace SafetyChatbot.Application.Services

{

    public class DialogflowService : IDialogflowService
    {
        private readonly SessionsClient _sessionsClient;
        private readonly string _projectId;
        private readonly string _knowledgeBaseId;

        public DialogflowService(string projectId, string knowledgeBaseId)
        {
            _sessionsClient = SessionsClient.Create(); // Uses ADC
            _projectId = projectId;
            _knowledgeBaseId = knowledgeBaseId;
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

            var knowledgeBaseName = KnowledgeBaseName.FromProjectKnowledgeBase(_projectId, _knowledgeBaseId);

            var queryParams = new QueryParameters
            {
                KnowledgeBaseNames = { knowledgeBaseName.ToString() }
            };

            var request = new DetectIntentRequest
            {
                SessionAsSessionName = sessionName,
                QueryInput = queryInput,
                QueryParams = queryParams
            };

            var response = await _sessionsClient.DetectIntentAsync(request);

            var knowledgeAnswers = response.QueryResult.KnowledgeAnswers?.Answers;
            if (knowledgeAnswers != null && knowledgeAnswers.Count > 0)
            {
                return knowledgeAnswers[0].Answer_;
            }

            return response.QueryResult.FulfillmentText;
        }
    }
}