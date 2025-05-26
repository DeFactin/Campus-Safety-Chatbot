using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Web;
using SafetyChatbot.Api.MappingProfiles;
using SafetyChatbot.Application.Services;
using SafetyChatbot.Domain.Models;
using SafetyChatbot.Infrastructure.Repositories;
using System.Security.Authentication;



var builder = WebApplication.CreateBuilder(args);
var env = builder.Environment.EnvironmentName;

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

FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromFile("serviceAccountKey.json")
});

// Register DialogflowService
var projectId = "campussafetychatbot-pom9";
var knowledgeBaseId = "MTcyMjMyMDM5NjA5MDc2Mjg1NDU";

builder.Services.AddSingleton<IDialogflowService>(provider =>
    new DialogflowService(projectId, knowledgeBaseId));

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAll");

app.MapControllers();
app.Run();