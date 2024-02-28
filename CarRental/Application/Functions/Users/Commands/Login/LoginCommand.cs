using MediatR;

namespace CarRental.Application.Functions.Users.Commands.Login
{
    public class LoginCommand : IRequest<UserResponse>
    {
        public string EmailAddress { get; set; }
        public string Password { get; set; }
    }
}
