using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using MediatR;

namespace CarRental.Application.Functions.Users.Queries.CheckUserIsExist
{
    public class GetUserByEmailQueryHandler : IRequestHandler<GetUserByEmailQuery, User?>
    {
        private readonly IUserRepository _userRepository;
        public GetUserByEmailQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserByEmailAddressAsync(request.UserEmailAddress);
            return user;
        }
    }
}
