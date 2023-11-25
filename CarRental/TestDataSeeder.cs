using CarRental.Entities;
using Newtonsoft.Json;

namespace CarRental
{
    public static class TestDataSeeder
    {
        internal static Vehicle[] GetTestVehiclesData()
        {
            return new Vehicle[]
            {
                new Vehicle
                {
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
                },

                new Vehicle
                {
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
                    IsAvailable = true,
                    NextCarInspection = DateTime.Now.AddYears(1),
                    RentalNetPricePerDay = 150,
                    Currency = "PLN",
                    VatRate = 0.23m,
                },

                new Vehicle
                {
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
                }
            };
        }
    }
}
