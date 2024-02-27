using CarRental.Application.Functions.Users.Commands.AddEmployee;
using MediatR;

namespace CarRental
{
    public class CreateStartAdmin
    {
        private readonly IMediator _mediator;
        public CreateStartAdmin(IMediator mediator)
        {
            _mediator = mediator;
        }

        internal async Task Create()
        {
            var startAdmin = new AddEmployeeCommand
            {
                Name = "Admin",
                LastName = "Admin",
                DateOfBirth = new DateTime(1990, 1, 1),
                Gender = "Female",
                Role = "admin",
                EmailAddress = "admin@admin.com",
                Password = "adminadmin",
                RepeatPassword = "adminadmin",
                PhoneNumber = "+48 123 456 789",
                Street = "ul. Admina",
                HouseNumber = "1",
                ApartmentNumber = "2",
                City = "Warszawa",
                State = "Mazowieckie",
                Country = "Polska",
                PostalCode = "00-001"
            };
            
            var res = await _mediator.Send(startAdmin);
            Console.WriteLine(res.Success);
        }
    }
}
