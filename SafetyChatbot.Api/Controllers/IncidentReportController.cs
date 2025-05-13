using Microsoft.AspNetCore.Mvc;

using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using SafetyChatbot.Application;
using SafetyChatbot.Application.Dtos;
using SafetyChatbot.Domain.Models;
using SafetyChatbot.Infrastructure;
using SafetyChatbot.Infrastructure.Repositories;
using System.Text.Json;

namespace SafetyChatbot.Api.Controllers
{


    [ApiController]
    [Route("api/incidentreports")]


    public class IncidentReportController: ControllerBase
    {
        private readonly IIncidentReportRepository _incidentReportRepository;
        private readonly IMapper _mapper;

        public IncidentReportController(
            IIncidentReportRepository IncidentReportRepository,
            IMapper mapper)
        {
            _incidentReportRepository = IncidentReportRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<IncidentReportDto>> GetAll()
        {
            var reports = _incidentReportRepository.GetAll();
            var reportsDto = _mapper.Map<List<IncidentReportDto>>(reports);
            return Ok(reportsDto);
        }

      
        [HttpGet("{id}")]
        public ActionResult<IncidentReportDto> GetById(int id)
        {
            var report = _incidentReportRepository.GetSingle(id);
            if (report == null)
                return NotFound();

            var reportDto = _mapper.Map<IncidentReportDto>(report);
            return Ok(reportDto);
        }

        [HttpPost]
        public ActionResult<IncidentReportDto> Submit([FromBody] SubmitIncidentReportDto dto)
        {
            var report = _mapper.Map<IncidentReport>(dto);
            _incidentReportRepository.Add(report);

            var resultDto = _mapper.Map<IncidentReportDto>(report);
            return CreatedAtAction(nameof(GetById), new { id = resultDto.Id }, resultDto);
        }


        [HttpPut("{id}")]
        public ActionResult<IncidentReportDto> Update(int id, [FromBody] SubmitIncidentReportDto dto)
        {
            var existing = _incidentReportRepository.GetSingle(id);
            if (existing == null)
                return NotFound();

            existing.LastUpdated = DateTime.UtcNow;

            _mapper.Map(dto, existing);
            _incidentReportRepository.Update(id, existing);

            var resultDto = _mapper.Map<IncidentReportDto>(existing);
            return Ok(resultDto);
        }

        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
         
            _incidentReportRepository.Delete(id);
            return NoContent();
        }

    }
}
