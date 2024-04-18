using AutoMapper;
using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CarRental.Application.Functions.Users.Commands.AddEmployee
{
    public class AddEmployeeCommandHandler : IRequestHandler<AddEmployeeCommand, UserResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IMediator _mediator;

        public AddEmployeeCommandHandler(IUserRepository userRepository, IMapper mapper, AuthenticationSettings authenticationSettings, IPasswordHasher<User> passwordHasher, IMediator mediator)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _authenticationSettings = authenticationSettings;
            _passwordHasher = passwordHasher;
            _mediator = mediator;
        }

        public async Task<UserResponse> Handle(AddEmployeeCommand request, CancellationToken cancellationToken)
        {
            AddEmployeeValidator validator = new(_mediator);
            var validationResult = validator.Validate(request);

            if (!validationResult.IsValid)
            {
                return new UserResponse(validationResult);
            }

            Employee employeeToAdd = _mapper.Map<Employee>(request);
            employeeToAdd.Id = new Guid();
            employeeToAdd.PasswordHash = _passwordHasher.HashPassword(employeeToAdd, request.Password);
            employeeToAdd.CreatedAt = DateTime.UtcNow;
            employeeToAdd.UpdatedAt = DateTime.UtcNow;
            employeeToAdd.IsActive = true;

            var addedUser = await _userRepository.AddUserAsync(employeeToAdd);


            if (addedUser == null)
            {
                return new UserResponse(false, "Something went wrong.", ResponseBase.ResponseStatus.Error);
            }

            return new UserResponse(true, "Employee added.", ResponseBase.ResponseStatus.Success);
        }
    }
}
