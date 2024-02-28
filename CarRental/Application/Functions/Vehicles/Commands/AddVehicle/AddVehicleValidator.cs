using FluentValidation;

namespace CarRental.Application.Functions.Vehicles.Commands.AddVehicle
{
    public class AddVehicleValidator : AbstractValidator<AddVehicleCommand>
    {
        public AddVehicleValidator()
        {
            RuleFor(v => v.VinNumber)
                .NotEmpty()
                .WithMessage("VIN Number is required.");

            RuleFor(v => v.LicensePlate)
                .NotEmpty()
                .WithMessage("License Plate is required.");

            RuleFor(v => v.Brand)
                .NotEmpty()
                .WithMessage("Brand is required.");

            RuleFor(v => v.Model)
                .NotEmpty()
                .WithMessage("Model is required.");

            RuleFor(v => v.YearOfProduction)
                .InclusiveBetween(1886, DateTime.Now.Year)
                .WithMessage("Year of Production must be between 1886 and current year.");

            RuleFor(v => v.BodyType)
                .NotEmpty()
                .WithMessage("Body Type is required.");

            RuleFor(v => v.FuelType)
                .NotEmpty()
                .WithMessage("Fuel Type is required.");

            RuleFor(v => v.Color)
                .NotEmpty()
                .WithMessage("Color is required.");

            RuleFor(v => v.Mileage)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Mileage must be greater than or equal to 0.");

            RuleFor(v => v.EngineSize)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Engine Size must be greater than or equal to 0.");

            RuleFor(v => v.EnginePower)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Engine Power must be greater than or equal to 0.");

            RuleFor(v => v.Torqe)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Torque must be greater than or equal to 0.");

            RuleFor(v => v.GearboxType)
                .NotEmpty()
                .WithMessage("Gearbox Type is required.");

            RuleFor(v => v.Weight)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Weight must be greater than or equal to 0.");

            RuleFor(v => v.NumberOfDoors)
                .InclusiveBetween(1, 5)
                .WithMessage("Number of Doors must be between 1 and 5.");

            RuleFor(v => v.Seats)
                .InclusiveBetween(1, 9)
                .WithMessage("Number of Seats must be between 1 and 9.");


            RuleFor(v => v.CarEquipment)
                .NotEmpty().WithMessage("Car Equipment is required.");

            RuleFor(v => v.NextCarInspection)
                .NotEmpty()
                .WithMessage("Next Car Inspection date is required.");

            RuleFor(v => v.RentalNetPricePerDay)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Rental Net Price Per Day must be greater than or equal to 0.");

            RuleFor(v => v.Currency)
                .NotEmpty()
                .WithMessage("Currency is required.");

            RuleFor(v => v.VatRate)
                .InclusiveBetween(0, 100)
                .WithMessage("VAT Rate must be between 0 and 100.");
        }
    }

}
