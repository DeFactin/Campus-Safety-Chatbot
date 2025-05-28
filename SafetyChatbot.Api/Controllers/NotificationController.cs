using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SafetyChatbot.Application.Dtos;
using SafetyChatbot.Application.Services;
using SafetyChatbot.Domain.Models;
using System.Security.Claims;

namespace SafetyChatbot.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/push")]
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public NotificationController(ApplicationDbContext context)
        {
            _context = context;
        }

        public class PushTokenDto
        {
            public string Token { get; set; }
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterToken([FromBody] PushTokenDto model)
        {
            if (model == null || string.IsNullOrEmpty(model.Token))
                return BadRequest("Invalid FCM token.");

            var userId = User.FindFirst("preferred_username")?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User id not found in token.");

            var userToken = await _context.PushTokens.FirstOrDefaultAsync(x => x.UserId == userId);

            if (userToken == null)
            {
                userToken = new PushToken
                {
                    UserId = userId,
                    Token = model.Token,
                    LastUpdated = DateTime.UtcNow
                };
                _context.PushTokens.Add(userToken);
            }
            else
            {
                userToken.Token = model.Token;
                userToken.LastUpdated = DateTime.UtcNow;
                _context.PushTokens.Update(userToken);
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "FCM token registered successfully." });
        }

        [Authorize]
        [HttpGet("get-notifications")]
        public async Task<ActionResult<IEnumerable<NotificationRecord>>> GetUserNotifikacije()
        {
            var userId = User.FindFirst("preferred_username")?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            return await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.ReceivedAt)
                .ToListAsync();
        }

        [Authorize]
        [HttpPost("mark-all-read")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            var userId = User.FindFirst("preferred_username")?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var unreadNotifications = await _context.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .ToListAsync();

            foreach (var n in unreadNotifications)
            {
                n.IsRead = true;
            }

            await _context.SaveChangesAsync();

            return Ok();
        }



        [Authorize]
        [HttpGet("get-unread-notifications")]
        public async Task<ActionResult<IEnumerable<NotificationRecord>>> GetUnreadNotifications()
        {
            var userId = User.FindFirst("preferred_username")?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var unreadNotifications = await _context.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .OrderByDescending(n => n.ReceivedAt)
                .ToListAsync();

            return unreadNotifications;
        }




    }


}