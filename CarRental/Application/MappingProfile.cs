using AutoMapper;
using CarRental.Application.Functions.Users.Commands.Register;
using CarRental.Domain.Entities;

namespace CarRental.Application
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterClientCommand, Client>()
                .ReverseMap();
        }
    }
}
