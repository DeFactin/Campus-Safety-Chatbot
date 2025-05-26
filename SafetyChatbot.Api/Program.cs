using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SafetyChatbot.Api.MappingProfiles;
using SafetyChatbot.Infrastructure.Repositories;
using Microsoft.Identity.Web;
using System.Security.Authentication;
using SafetyChatbot.Domain.Models;
using SafetyChatbot.Application.Services;


var builder = WebApplication.CreateBuilder(args);

// Get the connection string directly
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
// Register DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddAutoMapper(typeof(ApplicationMappings));
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddAuthorization();


builder.Services.AddControllers();
builder.Services.AddScoped<IIncidentReportRepository, IncidentReportSqlRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Register DialogflowService
var projectId = "campussafetychatbot-pom9";
var knowledgeBaseId = "MTcyMjMyMDM5NjA5MDc2Mjg1NDU";

builder.Services.AddSingleton<IDialogflowService>(provider =>
    new DialogflowService(projectId, knowledgeBaseId));
builder.Services.AddScoped<IChatRepository, ChatRepository>();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAll");

app.MapControllers();
app.Run();