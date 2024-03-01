using CarRental.Domain.Entities;
using Microsoft.Extensions.Options;
using Sieve.Models;
using Sieve.Services;
using System.Xml.Linq;

namespace CarRental.Infrastructure
{
    public class CarRentalSieveProcessor : SieveProcessor
    {
        public CarRentalSieveProcessor(IOptions<SieveOptions> options) : base(options)
        { }

        protected override SievePropertyMapper MapProperties(SievePropertyMapper mapper)
        {
            mapper.Property<Vehicle>(v => v.Brand)
                .CanSort()
                .CanFilter();

            mapper.Property<Vehicle>(v => v.Model)
                .CanSort()
                .CanFilter();

            mapper.Property<Vehicle>(v => v.BodyType)
                .CanSort()
                .CanFilter();

            mapper.Property<Vehicle>(v => v.Seats)
                .CanSort()
                .CanFilter();

            mapper.Property<Vehicle>(v => v.RentalNetPricePerDay)
                .CanSort()
                .CanFilter();

            mapper.Property<Vehicle>(v => v.YearOfProduction)
                .CanSort()
                .CanFilter();

            mapper.Property<Vehicle>(v => v.EnginePower)
                .CanSort()
                .CanFilter();

            mapper.Property<Vehicle>(v => v.FuelType)
                .CanSort()
                .CanFilter();

            mapper.Property<Vehicle>(v => v.GearboxType)
                .CanSort()
                .CanFilter();

            mapper.Property<Vehicle>(v => v.IsAvailable)
                .CanSort()
                .CanFilter();

            mapper.Property<Vehicle>(v => v.Mileage)
                .CanSort()
                .CanFilter();

            mapper.Property<Vehicle>(v => v.NextCarInspection)
                .CanSort()
                .CanFilter();

            return mapper;
        }
    }
}