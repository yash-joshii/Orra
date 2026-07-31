using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Paymentapi.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthTestController : ControllerBase
    {
        [HttpGet("check")]
        [Authorize]
        public IActionResult Check()
        {
            var supabaseId = User.FindFirst("sub")?.Value;
            return Ok(new { supabaseId, message = "Token verified successfully" });
        }

        [HttpGet("claims")]
        [Authorize]
        public IActionResult Claims()
        {
            var claims = User.Claims.Select(c => new { c.Type, c.Value });
            return Ok(claims);
        }
    }
}

