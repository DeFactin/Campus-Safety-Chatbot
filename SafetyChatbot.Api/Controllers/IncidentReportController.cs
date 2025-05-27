using Microsoft.AspNetCore.Mvc;

using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using SafetyChatbot.Application;
using SafetyChatbot.Application.Dtos;
using SafetyChatbot.Domain.Models;
using SafetyChatbot.Infrastructure;
using SafetyChatbot.Infrastructure.Repositories;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult<IEnumerable<IncidentReportDto>> GetAll()
        {
            var reports = _incidentReportRepository.GetAll();
            var reportsDto = _mapper.Map<List<IncidentReportDto>>(reports);
            return Ok(reportsDto);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public ActionResult<IncidentReportDto> GetById(int id)
        {
            var report = _incidentReportRepository.GetSingle(id);
            if (report == null)
                return NotFound();

            var reportDto = _mapper.Map<IncidentReportDto>(report);
            return Ok(reportDto);
        }

        [Authorize]
        [HttpPost]
        [RequestSizeLimit(10_000_000)]
        public async Task<ActionResult<IncidentReportDto>> Submit([FromForm] SubmitIncidentReportDto dto)
        {
            try
            {
                if (dto == null)
                {
                    Console.WriteLine("DTO binding failed.");
                    return BadRequest("Invalid data.");
                }

               
                string? savedFilePath = null;
                if (dto.File != null && dto.File.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");
                    Directory.CreateDirectory(uploadsFolder);

                    var uniqueFileName = $"{Guid.NewGuid()}_{dto.File.FileName}";
                    savedFilePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var stream = new FileStream(savedFilePath, FileMode.Create))
                    {
                        await dto.File.CopyToAsync(stream);
                    }
                }

              
                var report = _mapper.Map<IncidentReport>(dto);

                if (!string.IsNullOrEmpty(savedFilePath))
                {
                    report.FilePath = savedFilePath;
                }

                _incidentReportRepository.Add(report);

                var resultDto = _mapper.Map<IncidentReportDto>(report);
                return CreatedAtAction(nameof(GetById), new { id = resultDto.Id }, resultDto);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { message = "An error occurred while processing your request." });
            }
        }


        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
         
            _incidentReportRepository.Delete(id);
            return NoContent();
        }

    }
}
