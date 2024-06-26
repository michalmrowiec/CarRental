﻿using AutoMapper;
using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CarRental.Application.Functions.Users.Commands.Register
{
    public class RegisterCustomerCommandHandler : IRequestHandler<RegisterCustomerCommand, UserResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IMediator _mediator;

        public RegisterCustomerCommandHandler(IUserRepository userRepository, IMapper mapper, AuthenticationSettings authenticationSettings, IPasswordHasher<User> passwordHasher, IMediator mediator)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _authenticationSettings = authenticationSettings;
            _passwordHasher = passwordHasher;
            _mediator = mediator;
        }

        public async Task<UserResponse> Handle(RegisterCustomerCommand request, CancellationToken cancellationToken)
        {
            RegisterValidator validator = new(_mediator);
            var validationResult = validator.Validate(request);

            if (!validationResult.IsValid)
            {
                return new UserResponse(validationResult);
            }

            Customer clientToAdd = _mapper.Map<Customer>(request);
            clientToAdd.Id = new Guid();
            clientToAdd.PasswordHash = _passwordHasher.HashPassword(clientToAdd, request.Password);
            clientToAdd.Role = "customer";
            clientToAdd.CreatedAt = DateTime.UtcNow;
            clientToAdd.UpdatedAt = DateTime.UtcNow;
            clientToAdd.IsActive = true;

            var addedUser = await _userRepository.AddUserAsync(clientToAdd);


            if (addedUser == null)
            {
                return new UserResponse(false, "Something went wrong.", ResponseBase.ResponseStatus.Error);
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
