using CarRental;
using CarRental.Application.Contracts;
using CarRental.Domain.Entities;
using CarRental.Infrastructure;
using CarRental.Infrastructure.Ropositories;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Program>());
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

builder.Services.AddControllersWithViews().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

var authenticationSettings = new AuthenticationSettings();
builder.Configuration.GetSection("Authentication").Bind(authenticationSettings);

builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = "Bearer";
    option.DefaultScheme = "Bearer";
    option.DefaultChallengeScheme = "Bearer";
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = authenticationSettings.JwtIssuer,
        ValidAudience = authenticationSettings.JwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey)),
        ValidateLifetime = true
    };
});

builder.Services.AddSingleton(authenticationSettings);

builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

builder.Services.AddDbContext<CarRentalContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("LocalDb"));
});

builder.Services.AddScoped(typeof(IUserRepository), typeof(UserRepository));

var app = builder.Build();

// Automatic sending of pending migrations to the database
using var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<CarRentalContext>();
var pendingMigrations = dbContext.Database.GetPendingMigrations();
if (pendingMigrations.Any())
{
    dbContext.Database.Migrate();
}

// Insert test data to db
if (!dbContext.Vehicles.Any() && !dbContext.Insurances.Any() && !dbContext.Employees.Any() && !dbContext.Clients.Any() && !dbContext.Rentals.Any() && !dbContext.VehicleServices.Any())
{
    dbContext.Vehicles.AddRange(TestDataSeeder.GetTestVehiclesData());
    dbContext.Insurances.AddRange(TestDataSeeder.GetTestInsurancesData());
    dbContext.Employees.AddRange(TestDataSeeder.GetTestEmployeesData());
    dbContext.Clients.AddRange(TestDataSeeder.GetTestClientsData());
    dbContext.Rentals.AddRange(TestDataSeeder.GetTestRentalsData());
    dbContext.VehicleServices.AddRange(TestDataSeeder.GetTestVehicleServicesData());
    dbContext.SaveChanges();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CarRentalAPI"));

app.UseAuthentication();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
