using CarRental;
using CarRental.API.Services;
using CarRental.Application.Contracts;
using CarRental.Application.Contracts.Files;
using CarRental.Domain.Entities;
using CarRental.Infrastructure;
using CarRental.Infrastructure.Ropositories;
using CarRental.Infrastructure.Ropositories.Files;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Sieve.Services;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Program>());
builder.Services.AddSwaggerGen(cfg =>
{
    cfg.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please insert token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = "bearer"
        });

    cfg.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

builder.Services.AddScoped<IUserContextService, UserContextService>();
builder.Services.AddHttpContextAccessor();

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
    options.UseSqlServer(builder.Configuration.GetConnectionString("ContainerDb"));
});

builder.Services.AddScoped<ISieveProcessor, CarRentalSieveProcessor>();

builder.Services.AddScoped(typeof(IUserRepository), typeof(UserRepository));
builder.Services.AddScoped(typeof(IVehicleRepository), typeof(VehicleRepository));
builder.Services.AddScoped(typeof(IFileRepository), typeof(ServerStaticFileRepository));
builder.Services.AddScoped(typeof(IRentalRepository), typeof(RentalRepository));

var app = builder.Build();

// Automatic sending of pending migrations to the database
using var scope = app.Services.CreateScope();
var dbContext = scope.ServiceProvider.GetRequiredService<CarRentalContext>();
var pendingMigrations = dbContext.Database.GetPendingMigrations();
if (pendingMigrations.Any())
{
    dbContext.Database.Migrate();
}

if (!dbContext.Employees.Any(e => e.Role == "admin"))
{
    var csr = new CreateStartAdmin(scope.ServiceProvider.GetRequiredService<IMediator>());
    await csr.Create();
}
dbContext.Vehicles.AddRange(TestDataSeeder.GetTestVehiclesData());

// Insert test data to db
if (!dbContext.Vehicles.Any() && !dbContext.Insurances.Any() && !dbContext.Employees.Any() && !dbContext.Customers.Any() && !dbContext.Rentals.Any() && !dbContext.VehicleServices.Any())
{
    dbContext.Vehicles.AddRange(TestDataSeeder.GetTestVehiclesData());
    dbContext.Insurances.AddRange(TestDataSeeder.GetTestInsurancesData());
    dbContext.Employees.AddRange(TestDataSeeder.GetTestEmployeesData());
    dbContext.Customers.AddRange(TestDataSeeder.GetTestClientsData());
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
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "ClientApp", "src", "images")),
    RequestPath = "/images"
});
app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
