using CarRental.Application.Functions.Users.Queries.CheckUserIsExist;
using FluentValidation;
using MediatR;

namespace CarRental.Application.Functions.Users.Commands.Register
{
    public class RegisterValidator : AbstractValidator<RegisterCustomerCommand>
    {
        private readonly IMediator _mediator;

        public RegisterValidator(IMediator mediator)
        {
            _mediator = mediator;

            RuleFor(r => r.EmailAddress)
                .NotNull()
                .NotEmpty()
                .WithMessage("{PropertyName} is required")
                .EmailAddress()
                .WithMessage("{PropertyName} must be email address")
                .Custom((value, context) =>
                {
                    //Validate email in use
                    var user = _mediator.Send(new GetUserByEmailQuery(value)).Result;
                    if (user != null)
                        context.AddFailure("Email", "Email is taken");
                });

            RuleFor(r => r.Password)
                .NotNull()
                .NotEmpty()
                .WithMessage("{PropertyName} is required")
                .MinimumLength(6)
                .WithMessage("{PropertyName} must be above 6 characters")
                .MaximumLength(35)
                .WithMessage("{PropertyName} must not exceed 35 characters");

            RuleFor(r => r.RepeatPassword)
                .Equal(r => r.Password)
                .WithMessage("Passwords are not the same");

            RuleFor(r => r.DateOfBirth)
                .NotNull()
                .NotEmpty()
                .WithMessage("{PropertyName} is required")
                .Custom((value, context) =>
                {
                    if (value.AddYears(18) > DateTime.Today)
                    {
                        context.AddFailure("{PropertyName}", "You must be at least 18 years old.");
                    }
                });
        }
    }
}
