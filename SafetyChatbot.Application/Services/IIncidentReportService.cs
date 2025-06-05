using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using SafetyChatbot.Application.Dtos;

namespace SafetyChatbot.Application.Services
{
    public interface IIncidentReportService
    {
        (IEnumerable<IncidentReportDto> Reports, bool Empty) GetAll();
        (IncidentReportDto Report, bool NotFound) GetSingle(int id);
        (IncidentReportDto Report, bool Created, string? Error) Add(SubmitIncidentReportDto dto);
        (IncidentReportDto Report, bool NotFound, string? Error) Update(int id, IncidentReportDto dto);
        (IncidentReportDto Report, bool NotFound, string? Error) Patch(int id, JsonPatchDocument<IncidentReportDto> patchDoc, ModelStateDictionary modelState);
        (bool NotFound, string? Error) Delete(int id);
    }
}
