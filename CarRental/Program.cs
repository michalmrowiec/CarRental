using CarRental;
using CarRental.Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<CarRentalContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("LocalDb"));
});


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
var vehicles = dbContext.Vehicles.ToList();
if (!vehicles.Any())
{
    dbContext.Vehicles.AddRange(TestDataSeeder.GetTestVehiclesData());
    dbContext.SaveChanges();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
