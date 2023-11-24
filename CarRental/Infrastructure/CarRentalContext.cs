using CarRental.Entities;
using Microsoft.EntityFrameworkCore;

namespace CarRental.Infrastructure
{
    public class CarRentalContext : DbContext
    {
        public CarRentalContext(DbContextOptions<CarRentalContext> dbContextOptions) : base(dbContextOptions)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<VehicleService> VehicleServices { get; set; }
        public DbSet<Insurance> Insurances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Rental>(eb =>
            {
                eb.HasOne(r => r.Client)
                .WithMany(c => c.Rentals)
                .HasForeignKey(r => r.ClientId)
                .OnDelete(DeleteBehavior.NoAction);

                eb.HasOne(r => r.Employee)
                .WithMany(e => e.AcceptedRentals)
                .HasForeignKey(r => r.AcceptingEmployeeId);

                eb.HasOne(r => r.Vehicle)
                .WithMany(v => v.Rentals)
                .HasForeignKey(r => r.VehicleId);

                eb.Property(r => r.NetAmount)
                .HasPrecision(19, 4);

                eb.Property(r => r.VatRate)
                .HasPrecision(7, 4);

                eb.Property(r => r.DiscountRate)
                .HasPrecision(7, 4);

                eb.Property(r => r.TotalGrossAmount)
                .HasPrecision(19, 4);
            });

            modelBuilder.Entity<Insurance>(eb =>
            {
                eb.HasOne(i => i.Vehicle)
                .WithMany(v => v.Insurances)
                .HasForeignKey(i => i.VehicleId);

                eb.HasOne(i => i.Employee)
                .WithMany(e => e.CreatedInsurances)
                .HasForeignKey(i => i.CreatedByEmployeeId);

                eb.Property(i => i.NetCost)
                .HasPrecision(19, 4);

                eb.Property(i => i.VatRate)
                .HasPrecision(7, 4);


                eb.Property(i => i.TotalGrossCost)
                .HasPrecision(19, 4);
            });

            modelBuilder.Entity<VehicleService>(eb =>
            {
                eb.HasOne(vs => vs.Vehicle)
                .WithMany(v => v.VehicleServices)
                .HasForeignKey(vs => vs.VehicleId);

                eb.HasOne(vs => vs.Employee)
                .WithMany(e => e.CreatedVehicleServices)
                .HasForeignKey(vs => vs.CreatedByEmployeeId);

                eb.Property(vs => vs.NetCost).HasPrecision(19, 4);

                eb.Property(vs => vs.VatRate)
                .HasPrecision(7, 4);

                eb.Property(vs => vs.TotalGrossCost)
                .HasPrecision(19, 4);
            });

            modelBuilder.Entity<Vehicle>(eb =>
            {
                eb.Property(v => v.RentalNetPricePerDay)
                .HasPrecision(19, 4);

                eb.Property(v => v.VatRate)
                .HasPrecision(7, 4);
            });
        }
    }
}
