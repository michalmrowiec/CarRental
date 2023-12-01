using FluentValidation.Results;

namespace CarRental.Application.Functions.Users.Commands.Register
{
    public class RegisterClientResponse : ResponseBase
    {
        public JwtToken? JwtToken { get; set; }
        public RegisterClientResponse(JwtToken jwtToken) : base()
        {
            JwtToken = jwtToken;
            Success = true;
            ValidationErrors = new();
        }
        public RegisterClientResponse(bool status, string message) : base(status, message)
        { }
        public RegisterClientResponse(bool success, string? message, ValidationResult validationResult) : base(success, message, validationResult)
        { }

        public RegisterClientResponse(ValidationResult validationResult) : base(validationResult)
        { }
    }
}
