using AutoMapper;
using CarRental.Application.Functions.Users.Commands.AddEmployee;
using CarRental.Application.Functions.Users.Commands.Register;
using CarRental.Domain.Entities;

namespace CarRental.Application
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterCustomerCommand, Customer>()
                .ReverseMap();

            CreateMap<AddEmployeeCommand,  Employee>()
                .ReverseMap();
        }
    }
}
