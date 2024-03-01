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
        public UserResponse(bool status, string message, ResponseStatus responseStatus) : base(status, message, responseStatus)
        { }

        public UserResponse(ValidationResult validationResult) : base(validationResult)
        { }
    }
}
