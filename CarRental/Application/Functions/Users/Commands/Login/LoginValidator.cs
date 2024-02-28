using FluentValidation;

namespace CarRental.Application.Functions.Users.Commands.Login
{
    public class LoginValidator : AbstractValidator<LoginCommand>
    {
        public LoginValidator()
        {
            RuleFor(e => e.EmailAddress)
                .NotNull()
                .NotEmpty()
                .WithMessage("{PropertyName} is required")
                .EmailAddress()
                .WithMessage("{PropertyName} must be email address");

            RuleFor(e => e.Password)
                .NotNull()
                .NotEmpty();
        }
    }
}
