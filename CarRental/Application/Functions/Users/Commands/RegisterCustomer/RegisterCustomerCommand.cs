﻿using MediatR;

namespace CarRental.Application.Functions.Users.Commands.Register
{
    public class RegisterCustomerCommand : IRequest<UserResponse>
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string RepeatPassword { get; set; }
        public string PhoneNumber { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string ApartmentNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
    }
}
