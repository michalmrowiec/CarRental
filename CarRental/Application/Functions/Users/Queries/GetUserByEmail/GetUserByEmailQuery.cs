using CarRental.Domain.Entities;
using MediatR;

namespace CarRental.Application.Functions.Users.Queries.CheckUserIsExist
{
    public record GetUserByEmailQuery(string UserEmailAddress) : IRequest<User?>;
}
