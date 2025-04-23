using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SafetyChatbot.Api.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
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
        [Authorize]
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

            var tokenClaims = new[]
            {
        new Claim("name", name),
        new Claim("role", role)
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("A7f$kLz#9vP@wXq!3BnRtYuE5mJzChT2"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "yourapp",
                audience: "yourapp",
                claims: tokenClaims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return Redirect($"https://localhost:51395/?token={jwt}");
        }


        [HttpGet("/signout")]
        public IActionResult SignOutApp()
        {
            return SignOut(
                new AuthenticationProperties { RedirectUri = "/" },
                OpenIdConnectDefaults.AuthenticationScheme,
                CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }
}
