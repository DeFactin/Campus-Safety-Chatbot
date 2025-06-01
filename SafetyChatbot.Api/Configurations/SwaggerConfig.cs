using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace SafetyChatbot.Api.Configurations
{
   
    public static class SwaggerConfig
    {
        public static void AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Safety Chatbot API",
                    Version = "v1",
                    Description = "API documentation for the Campus Safety Chatbot project"
                });

            });
        }
    }

}
