using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SafetyChatbot.Models;

[Route("api/guidelines")]
[ApiController]
public class SafetyRegulationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SafetyRegulationsController(ApplicationDbContext context)
    {
        _context = context;
    }
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SafetyRegulation>>> Get()
    {
        return await _context.SafetyRegulations.ToListAsync();
    }
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<SafetyRegulation>> Post([FromBody] SafetyRegulation regulation)
    {
        regulation.Id = 0; // Ensure ID is not manually set
        _context.SafetyRegulations.Add(regulation);
        await _context.SaveChangesAsync();
        
        return Ok(regulation);
    }

}
