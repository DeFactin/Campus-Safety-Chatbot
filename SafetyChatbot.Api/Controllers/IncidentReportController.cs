using AutoMapper;
using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SafetyChatbot.Application;
using SafetyChatbot.Application.Dtos;
using SafetyChatbot.Application.Services;
using SafetyChatbot.Domain.Models;
using SafetyChatbot.Domain;
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
        private readonly ApplicationDbContext _context;


        public IncidentReportController(
            IIncidentReportRepository IncidentReportRepository,
            IMapper mapper,
            ApplicationDbContext context )
        {
            _incidentReportRepository = IncidentReportRepository;
            _mapper = mapper;
            _context = context;
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
        [HttpPatch("{id}")]
        public async Task<ActionResult<IncidentReportDto>> Patch(int id, [FromBody] PatchIncidentDto dto)
        {
            if (dto == null)
                return BadRequest();

            var existing = _incidentReportRepository.GetSingle(id);
            if (existing == null)
                return NotFound();

            var oldStatus = existing.Status;

            // Patch only fields that are non-null
            if (dto.ReportedBy != null) existing.ReportedBy = dto.ReportedBy;
            if (dto.IncidentType != null) existing.IncidentType = dto.IncidentType;
            if (dto.Status != null) existing.Status = dto.Status;
            if (dto.Description != null) existing.Description = dto.Description;
            if (dto.Date != null) existing.Date = dto.Date.Value;
            if (dto.Location != null) existing.Location = dto.Location;
            if (dto.Severity != null) existing.Severity = dto.Severity;
            if (dto.AdminNotes != null) existing.AdminNotes = dto.AdminNotes;

            existing.LastUpdated = DateTime.UtcNow;

            _incidentReportRepository.Update(id, existing);

            if (oldStatus != existing.Status)
            {
                var tokens = await _context.PushTokens
                    .Where(t => t.UserId == existing.ReportedBy)
                    .Select(t => t.Token)
                    .ToListAsync();

                var notification = new NotificationRecord
                {
                    UserId = existing.ReportedBy,
                    Title = $"Status of incident changed to {existing.Status}",
                    Message = $"{existing.AdminNotes}",
                    ReceivedAt = DateTime.UtcNow,
                    IsRead = false
                };

                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();

                foreach (var token in tokens)
                {
                    var message = new Message()
                    {

                        Token = token,
                        Data = new Dictionary<string, string>()
            {
                { "title", notification.Title },
                { "body", notification.Message }
            }
                    };

                    try
                    {
                        string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
                        Console.WriteLine($"Successfully sent message: {response}");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Failed to send message to token {token}: {ex.Message}");
                    }
                }
            }

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
