using CarRental.Domain.Entities;
using Newtonsoft.Json;

namespace CarRental
{
    internal static class TestDataSeeder
    {
        internal static Vehicle[] GetTestVehiclesData()
        {
            return new Vehicle[]
            {
                new Vehicle
                {
                    Id = Guid.Parse("dd1a5282-c6a3-47ad-8167-827e3fc44509"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    VinNumber = "1HGCM82633A123456",
                    LicensePlate = "XYZ 123",
                    Brand = "Honda",
                    Model = "Accord",
                    YearOfProduction = 2020,
                    BodyType = "Sedan",
                    FuelType = "Benzyna",
                    Color = "Czarny",
                    Mileage = 15000,
                    EngineSize = 2.0f,
                    EnginePower = 158,
                    Torqe = 138,
                    GearboxType = "Automatyczna",
                    Weight = 1500,
                    NumberOfDoors = 4,
                    CarEquipment = JsonConvert.SerializeObject(new List<string> { "Klimatyzacja", "Alufelgi", "ABS" }),
                    IsAvailable = true,
                    NextCarInspection = DateTime.Now.AddYears(1),
                    RentalNetPricePerDay = 100,
                    Currency = "PLN",
                    VatRate = 0.23m,
                    ImageUrls = "images\\VehicleImage\\sample_car.jpeg;"
                },

                new Vehicle
                {
                    Id = Guid.Parse("ab336acb-b2fc-47cc-889b-0b7f43b37856"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    VinNumber = "WBA3B9C50EF478128",
                    LicensePlate = "ABC 456",
                    Brand = "BMW",
                    Model = "335i",
                    YearOfProduction = 2020,
                    BodyType = "Coupe",
                    FuelType = "Benzyna",
                    Color = "Biały",
                    Mileage = 20000,
                    EngineSize = 3.0f,
                    EnginePower = 300,
                    Torqe = 300,
                    GearboxType = "Automatyczna",
                    Weight = 1600,
                    NumberOfDoors = 2,
                    CarEquipment = JsonConvert.SerializeObject(new List<string> { "Skórzane siedzenia", "Szyberdach", "System nawigacji" }),
                    IsAvailable = false,
                    NextCarInspection = DateTime.Now.AddYears(1),
                    RentalNetPricePerDay = 150,
                    Currency = "PLN",
                    VatRate = 0.23m,
                    ImageUrls = "images\\VehicleImage\\sample_car.jpeg;"
                },

                new Vehicle
                {
                    Id = Guid.Parse("01290b99-ee56-49a7-9ef2-7eafa3060cbc"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    VinNumber = "JN1FAAZE0U0041234",
                    LicensePlate = "DEF 789",
                    Brand = "Nissan",
                    Model = "370Z",
                    YearOfProduction = 2020,
                    BodyType = "Coupe",
                    FuelType = "Benzyna",
                    Color = "Czerwony",
                    Mileage = 10000,
                    EngineSize = 3.7f,
                    EnginePower = 332,
                    Torqe = 270,
                    GearboxType = "Manualna",
                    Weight = 1496,
                    NumberOfDoors = 2,
                    CarEquipment = JsonConvert.SerializeObject(new List<string> { "Klimatyzacja", "Alufelgi", "ABS", "Skórzane siedzenia" }),
                    IsAvailable = true,
                    NextCarInspection = DateTime.Now.AddYears(1),
                    RentalNetPricePerDay = 200,
                    Currency = "PLN",
                    VatRate = 0.23m,
                    ImageUrls = "images\\VehicleImage\\sample_car.jpeg;"
                }
            };
        }

        internal static Insurance[] GetTestInsurancesData()
        {
            return new Insurance[]
            {
                new Insurance
                {
                    Id = Guid.Parse("c78eec5f-9be4-4a5f-988a-19d94885c575"),
                    PolicyNumber = "POL123",
                    Insurer = "Ubezpieczyciel1",
                    InsurerAddress = "ul. Konopnicka 82, 80-309 Gdańsk",
                    InsurerPhoneNumber = "+48 22 582 44 44",
                    InsuranceType = "OC",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddYears(1),
                    IsActive = true,
                    NetCost = 500m,
                    VatRate = 23m,
                    TotalGrossCost = 500m * 1.23m,
                    Currency = "PLN",
                    InsuranceConditions = "Standardowe warunki ubezpieczenia",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CreatedByEmployeeId = Guid.Parse("e4a1089a-c667-4d68-9610-5d58f19e5342"),
                    VehicleId = Guid.Parse("dd1a5282-c6a3-47ad-8167-827e3fc44509")
                },

                new Insurance
                {
                    Id = Guid.Parse("429b32e8-a231-4c8e-9e13-96faf8cca53f"),
                    PolicyNumber = "POL124",
                    Insurer = "Ubezpieczyciel2",
                    InsurerAddress = "ul. Piwna 187, 00-805 Warszawa",
                    InsurerPhoneNumber = "+48 22 582 58 31",
                    InsuranceType = "AC",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddYears(1),
                    IsActive = true,
                    NetCost = 1000m,
                    VatRate = 23m,
                    TotalGrossCost = 1000m * 1.23m,
                    Currency = "PLN",
                    InsuranceConditions = "Standardowe warunki ubezpieczenia",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CreatedByEmployeeId = Guid.Parse("e4a1089a-c667-4d68-9610-5d58f19e5342"),
                    VehicleId = Guid.Parse("ab336acb-b2fc-47cc-889b-0b7f43b37856")
                },

                new Insurance
                {
                    Id = Guid.Parse("3441f4d7-e92e-4908-a6e1-64be78a82d0d"),
                    PolicyNumber = "POL125",
                    Insurer = "Ubezpieczyciel3",
                    InsurerAddress = "ul. Prosta 24, 02-685 Warszawa",
                    InsurerPhoneNumber = "+48 22 567 31 50",
                    InsuranceType = "OC",
                    StartDate = DateTime.Now.AddYears(-1),
                    EndDate = DateTime.Now,
                    IsActive = false,
                    NetCost = 600m,
                    VatRate = 23m,
                    TotalGrossCost = 600m * 1.23m,
                    Currency = "PLN",
                    InsuranceConditions = "Standardowe warunki ubezpieczenia",
                    CreatedAt = DateTime.Now.AddYears(-1),
                    UpdatedAt = DateTime.Now,
                    CreatedByEmployeeId = Guid.Parse("e3085579-5632-4ebe-9e04-4935f745c361"),
                    VehicleId = Guid.Parse("01290b99-ee56-49a7-9ef2-7eafa3060cbc")
                },

                new Insurance
                {
                    Id = Guid.Parse("0057c300-8f7c-487b-8d0d-566b17db0310"),
                    PolicyNumber = "POL126",
                    Insurer = "Ubezpieczyciel3",
                    InsurerAddress = "ul. Prosta 24, 02-685 Warszawa",
                    InsurerPhoneNumber = "+48 22 566 90 00",
                    InsuranceType = "AC",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddYears(1),
                    IsActive = true,
                    NetCost = 1200m,
                    VatRate = 23m,
                    TotalGrossCost = 1200m * 1.23m,
                    Currency = "PLN",
                    InsuranceConditions = "Standardowe warunki ubezpieczenia",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    CreatedByEmployeeId = Guid.Parse("e3085579-5632-4ebe-9e04-4935f745c361"),
                    VehicleId = Guid.Parse("01290b99-ee56-49a7-9ef2-7eafa3060cbc")
                }

            };
        }

        internal static Employee[] GetTestEmployeesData()
        {
            return new Employee[]
            {
                new Employee
                {
                    Id = Guid.Parse("e4a1089a-c667-4d68-9610-5d58f19e5342"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Role = "manager",
                    Name = "Jan",
                    LastName = "Kowalski",
                    DateOfBirth = new DateTime(1980, 1, 1),
                    Gender = "Mężczyzna",
                    EmailAddress = "jan.kowalski@example.com",
                    PasswordHash = "hashed_password1",
                    PhoneNumber = "+48 123 456 789",
                    Street = "ul. Słoneczna",
                    HouseNumber = "10",
                    ApartmentNumber = "2",
                    City = "Warszawa",
                    State = "Mazowieckie",
                    Country = "Polska",
                    PostalCode = "00-001",
                    IsActive = true
                },

                new Employee
                {
                    Id = Guid.Parse("e3085579-5632-4ebe-9e04-4935f745c361"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Role = "employee",
                    Name = "Anna",
                    LastName = "Nowak",
                    DateOfBirth = new DateTime(1990, 1, 1),
                    Gender = "Kobieta",
                    EmailAddress = "anna.nowak@example.com",
                    PasswordHash = "hashed_password2",
                    PhoneNumber = "+48 987 654 321",
                    Street = "ul. Kwiatowa",
                    HouseNumber = "20",
                    ApartmentNumber = "3",
                    City = "Kraków",
                    State = "Małopolskie",
                    Country = "Polska",
                    PostalCode = "30-001",
                    IsActive = true
                }

            };
        }

        internal static Customer[] GetTestClientsData()
        {
            return new Customer[]
            {
                new Customer
                {
                    Id = Guid.Parse("aef40405-6d1c-468a-a002-cdd32c826a8b"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Role = "customer",
                    Name = "Piotr",
                    LastName = "Zieliński",
                    DateOfBirth = new DateTime(1985, 5, 5),
                    Gender = "Mężczyzna",
                    EmailAddress = "piotr.zielinski@example.com",
                    PasswordHash = "hashed_password",
                    PhoneNumber = "+48 123 456 789",
                    Street = "ul. Słoneczna",
                    HouseNumber = "10",
                    ApartmentNumber = "2",
                    City = "Warszawa",
                    State = "Mazowieckie",
                    Country = "Polska",
                    PostalCode = "00-001",
                    IsActive = true
                },

                new Customer
                {
                    Id = Guid.Parse("bc4f89d9-8470-4d18-8337-dec8f48f78df"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Role = "customer",
                    Name = "Maria",
                    LastName = "Kowalska",
                    DateOfBirth = new DateTime(1990, 6, 6),
                    Gender = "Kobieta",
                    EmailAddress = "maria.kowalska@example.com",
                    PasswordHash = "hashed_password",
                    PhoneNumber = "+48 987 654 321",
                    Street = "ul. Kwiatowa",
                    HouseNumber = "20",
                    ApartmentNumber = "3",
                    City = "Kraków",
                    State = "Małopolskie",
                    Country = "Polska",
                    PostalCode = "30-001",
                    IsActive = true
                },

                new Customer
                {
                    Id = Guid.Parse("273adeac-2c88-426d-92f8-09e13f60e06d"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Role = "customer",
                    Name = "Tomasz",
                    LastName = "Nowak",
                    DateOfBirth = new DateTime(1980, 7, 7),
                    Gender = "Mężczyzna",
                    EmailAddress = "tomasz.nowak@example.com",
                    PasswordHash = "hashed_password",
                    PhoneNumber = "+48 123 987 654",
                    Street = "ul. Zielona",
                    HouseNumber = "30",
                    ApartmentNumber = "4",
                    City = "Wrocław",
                    State = "Dolnośląskie",
                    Country = "Polska",
                    PostalCode = "50-001",
                    IsActive = true
                },

            };
        }

        internal static Rental[] GetTestRentalsData()
        {
            return new Rental[]
            {
                new Rental
                {
                    Id = Guid.Parse("d3e5d84d-6339-45ee-a1a2-e46506b2a41d"),
                    ClientId = Guid.Parse("aef40405-6d1c-468a-a002-cdd32c826a8b"),
                    AcceptingEmployeeId = Guid.Parse("e4a1089a-c667-4d68-9610-5d58f19e5342"),
                    VehicleId = Guid.Parse("dd1a5282-c6a3-47ad-8167-827e3fc44509"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(7),
                    IsVehiclePickedUp = true,
                    IsVehicleReturned = false,
                    NetAmountWithoutDiscount = 1000m,
                    VatRate = 23m,
                    DiscountRate = 0m,
                    TotalGrossAmount = 1000m * 1.23m,
                    IsPaid = true,
                    PaymentMethod = "Karta",
                    Comments = "Brak uwag"
                },

                new Rental
                {
                    Id = Guid.Parse("d1f7929b-a307-45ec-95b4-465e778d39d1"),
                    ClientId = Guid.Parse("bc4f89d9-8470-4d18-8337-dec8f48f78df"),
                    AcceptingEmployeeId = Guid.Parse("e3085579-5632-4ebe-9e04-4935f745c361"),
                    VehicleId = Guid.Parse("ab336acb-b2fc-47cc-889b-0b7f43b37856"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(14),
                    IsVehiclePickedUp = true,
                    IsVehicleReturned = false,
                    NetAmountWithoutDiscount = 2000m,
                    VatRate = 23m,
                    DiscountRate = 10m,
                    TotalGrossAmount = 2000m * 1.23m * 0.9m,
                    IsPaid = true,
                    PaymentMethod = "Gotówka",
                    Comments = "Brak uwag"
                },

                new Rental
                {
                    Id = Guid.Parse("9beebf70-60b9-4f4e-ac04-c0fb91ef1056"),
                    ClientId = Guid.Parse("273adeac-2c88-426d-92f8-09e13f60e06d"),
                    AcceptingEmployeeId = Guid.Parse("e4a1089a-c667-4d68-9610-5d58f19e5342"),
                    VehicleId = Guid.Parse("01290b99-ee56-49a7-9ef2-7eafa3060cbc"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(7),
                    IsVehiclePickedUp = false,
                    IsVehicleReturned = false,
                    NetAmountWithoutDiscount = 1500m,
                    VatRate = 23m,
                    DiscountRate = 0m,
                    TotalGrossAmount = 1500m * 1.23m,
                    IsPaid = false,
                    PaymentMethod = "Karta",
                    Comments = "Brak uwag"
                },

                new Rental
                {
                    Id = Guid.Parse("7d2e0cec-0b9d-42d9-8772-9fa02529182f"),
                    ClientId = Guid.Parse("aef40405-6d1c-468a-a002-cdd32c826a8b"),
                    AcceptingEmployeeId = Guid.Parse("e3085579-5632-4ebe-9e04-4935f745c361"),
                    VehicleId = Guid.Parse("dd1a5282-c6a3-47ad-8167-827e3fc44509"),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(14),
                    IsVehiclePickedUp = false,
                    IsVehicleReturned = false,
                    NetAmountWithoutDiscount = 2000m,
                    VatRate = 23m,
                    DiscountRate = 5m,
                    TotalGrossAmount = 2000m * 1.23m * 0.95m,
                    IsPaid = false,
                    PaymentMethod = "Gotówka",
                    Comments = "Brak uwag"
                }

            };
        }

        internal static VehicleService[] GetTestVehicleServicesData()
        {
            return new VehicleService[]
            {
                new VehicleService
                {
                    Id = Guid.Parse("6a728915-744b-43a5-918f-6417b007c19b"),
                    Name = "Przegląd techniczny",
                    Description = "Przegląd techniczny pojazdu",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    PlannedDate = DateTime.Now.AddDays(7),
                    ExecureDate = DateTime.Now.AddDays(14),
                    NetCost = 500m,
                    Currency = "PLN",
                    VatRate = 23m,
                    TotalGrossCost = 500m * 1.23m,
                    VehicleId = Guid.Parse("dd1a5282-c6a3-47ad-8167-827e3fc44509"),
                    CreatedByEmployeeId = Guid.Parse("e4a1089a-c667-4d68-9610-5d58f19e5342")
                },

                new VehicleService
                {
                    Id = Guid.Parse("b9bab5de-c2e8-48ac-bbc4-77985e4ac6d7"),
                    Name = "Wymiana opon",
                    Description = "Wymiana opon na sezonowe",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    PlannedDate = DateTime.Now.AddDays(14),
                    ExecureDate = DateTime.Now.AddDays(21),
                    NetCost = 200m,
                    Currency = "PLN",
                    VatRate = 23m,
                    TotalGrossCost = 200m * 1.23m,
                    VehicleId = Guid.Parse("ab336acb-b2fc-47cc-889b-0b7f43b37856"),
                    CreatedByEmployeeId = Guid.Parse("e3085579-5632-4ebe-9e04-4935f745c361")
                },

                new VehicleService
                {
                    Id = Guid.Parse("b82d4bf6-953e-42f3-a69c-01617dd4a756"),
                    Name = "Naprawa silnika",
                    Description = "Naprawa uszkodzonego silnika",
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    PlannedDate = DateTime.Now.AddDays(21),
                    ExecureDate = DateTime.Now.AddDays(28),
                    NetCost = 1500m,
                    Currency = "PLN",
                    VatRate = 23m,
                    TotalGrossCost = 1500m * 1.23m,
                    VehicleId = Guid.Parse("01290b99-ee56-49a7-9ef2-7eafa3060cbc"),
                    CreatedByEmployeeId = Guid.Parse("e4a1089a-c667-4d68-9610-5d58f19e5342")
                },

            };
        }
    }
}
