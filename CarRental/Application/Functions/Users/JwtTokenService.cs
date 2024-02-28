using CarRental.Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CarRental.Application.Functions.Users
{
    public class JwtTokenService
    {
        private readonly AuthenticationSettings _authenticationSettings;

        public JwtTokenService(AuthenticationSettings authenticationSettings)
        {
            _authenticationSettings = authenticationSettings;
        }

        public string GenerateJwt(User user)
        {
            var claims = new List<Claim>()
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, $"{user.Name} {user.LastName}"),
                new(ClaimTypes.Role, $"{user.Role}"),
                new(ClaimTypes.Email, user.EmailAddress),
                new(ClaimTypes.MobilePhone, user.PhoneNumber),
                new("DateOfBirth", user.DateOfBirth.ToString("yyyy-MM-dd")),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiress = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDaysForNormalLogin);

            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expiress,
                signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }
    }
}
