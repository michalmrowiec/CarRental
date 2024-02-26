using AutoMapper;
using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CarRental.Application.Functions.Users.Commands.Register
{
    public class RegisterClientCommandHandler : IRequestHandler<RegisterClientCommand, UserResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IMediator _mediator;

        public RegisterClientCommandHandler(IUserRepository userRepository, IMapper mapper, AuthenticationSettings authenticationSettings, IPasswordHasher<User> passwordHasher, IMediator mediator)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _authenticationSettings = authenticationSettings;
            _passwordHasher = passwordHasher;
            _mediator = mediator;
        }

        public async Task<UserResponse> Handle(RegisterClientCommand request, CancellationToken cancellationToken)
        {
            RegisterValidator validator = new(_mediator);
            var validationResult = validator.Validate(request);

            if (!validationResult.IsValid)
            {
                return new UserResponse(validationResult);
            }

            Client clientToAdd = _mapper.Map<Client>(request);
            clientToAdd.Id = new Guid();
            clientToAdd.PasswordHash = _passwordHasher.HashPassword(clientToAdd, request.Password);
            clientToAdd.Role = "customer";
            clientToAdd.CreatedAt = DateTime.UtcNow;
            clientToAdd.UpdatedAt = DateTime.UtcNow;
            clientToAdd.IsActive = true;

            var addedUser = await _userRepository.AddUserAsync(clientToAdd);


            if (addedUser == null)
            {
                return new UserResponse(false, "Something went wrong.");
            }

            JwtTokenService tokenService = new(_authenticationSettings);
            JwtToken jwtToken = new()
            {
                UserEmail = request.EmailAddress,
                Role = clientToAdd.Role,
                Token = tokenService.GenerateJwt(addedUser)
            };

            return new UserResponse(jwtToken);

        }
    }
}
