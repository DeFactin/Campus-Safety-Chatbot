using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SafetyChatbot.Domain.Models;

namespace SafetyChatbot.Api.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly JwtSettings _jwtSettings;

        public AccountController(IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }

        [HttpGet("/signin")]
        public IActionResult SignIn()
        {
            var redirectUrl = Url.Action("SignedIn", "Account");
            return Challenge(
                new AuthenticationProperties { RedirectUri = redirectUrl },
                OpenIdConnectDefaults.AuthenticationScheme);
        }

        [HttpGet("/ping")]
        public IActionResult Ping()
        {
            return Ok("I am alive!");
        }

        [HttpGet("/signedin")]
        public IActionResult SignedIn()
        {
            var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
            foreach (var claim in claims)
            {
                Console.WriteLine($"Claim: {claim.Type}, Value: {claim.Value}");
            }

            var name = User.FindFirst("name")?.Value ?? "Unknown";
            var role = User.FindFirst(ClaimTypes.Role)?.Value
                        ?? User.FindFirst("role")?.Value
                        ?? User.FindFirst("roles")?.Value
                        ?? "User";
            var preferredUsername = User.FindFirst("preferred_username")?.Value;

            var tokenClaims = new[]
            {
                new Claim("name", name),
                new Claim("role", role),
                new Claim("email", preferredUsername ?? string.Empty),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: tokenClaims,
                expires: DateTime.UtcNow.AddHours(_jwtSettings.ExpiryInHours),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            // Store JWT in HTTP-only cookie
            Response.Cookies.Append("token", jwt, new CookieOptions
            {
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(_jwtSettings.ExpiryInHours)
            });

            return Redirect($"https://localhost:51395/");

        }


        [HttpGet("/signout")]
        public IActionResult SignOutApp()
        {
            Response.Cookies.Delete("token");

            return SignOut(
                new AuthenticationProperties { RedirectUri = "/" },
                OpenIdConnectDefaults.AuthenticationScheme,
                CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}
