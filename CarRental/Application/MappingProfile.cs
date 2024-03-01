using AutoMapper;
using CarRental.Application.Functions.Users.Commands.AddEmployee;
using CarRental.Application.Functions.Users.Commands.Register;
using CarRental.Application.Functions.Vehicles.Commands.AddVehicle;
using CarRental.Application.Functions.Vehicles.Commands.UpdateVehicle;
using CarRental.Domain.Entities;

namespace CarRental.Application
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterCustomerCommand, Customer>();

            CreateMap<AddEmployeeCommand, Employee>();

            CreateMap<AddVehicleCommand, Vehicle>();
        }
    }
}
