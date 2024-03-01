using AutoMapper;
using CarRental.Application.Contracts;
using CarRental.Application.Functions.Users.Queries.CheckUserIsExist;
using CarRental.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CarRental.Application.Functions.Users.Commands.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, UserResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IMediator _mediator;

        public LoginCommandHandler(IUserRepository userRepository, IMapper mapper, AuthenticationSettings authenticationSettings, IPasswordHasher<User> passwordHasher, IMediator mediator)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _authenticationSettings = authenticationSettings;
            _passwordHasher = passwordHasher;
            _mediator = mediator;
        }

        public async Task<UserResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            LoginValidator validator = new();
            var validationResult = validator.Validate(request);

            if (!validationResult.IsValid)
            {
                return new UserResponse(validationResult);
            }

            var user = await _mediator.Send(new GetUserByEmailQuery(request.EmailAddress));

            if (user == null)
            {
                return new UserResponse(false, "Email address or password are wrong.", ResponseBase.ResponseStatus.NotFound);
            }

            var veryfication = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);

            if (veryfication == PasswordVerificationResult.Failed)
            {
                return new UserResponse(false, "Email address or password are wrong.", ResponseBase.ResponseStatus.NotFound);
            }

            JwtTokenService tokenService = new(_authenticationSettings);
            JwtToken jwtToken = new()
            {
                UserEmail = request.EmailAddress,
                Role = user.Role,
                Token = tokenService.GenerateJwt(user)
            };

            return new UserResponse(jwtToken);
        }
    }
}
