using FluentValidation.Results;

namespace CarRental.Application.Functions.Users.Commands
{
    public class UserResponse : ResponseBase
    {
        public JwtToken? JwtToken { get; set; }
        public UserResponse(JwtToken jwtToken) : base()
        {
            JwtToken = jwtToken;
            Success = true;
            ValidationErrors = new();
        }
        public UserResponse(bool status, string message) : base(status, message)
        { }
        public UserResponse(bool success, string? message, ValidationResult validationResult) : base(success, message, validationResult)
        { }

        public UserResponse(ValidationResult validationResult) : base(validationResult)
        { }
    }
}
