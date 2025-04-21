using AutoMapper;
using SafetyChatbot.Application.Dtos;
using SafetyChatbot.Domain.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SafetyChatbot.Api.MappingProfiles
{
    public class ApplicationMappings : Profile
    {
        public ApplicationMappings()
        {
            CreateMap<IncidentReport, IncidentReportDto>().ReverseMap();
            CreateMap<IncidentReport, SubmitIncidentReportDto>().ReverseMap();
          
        }
    }
}
