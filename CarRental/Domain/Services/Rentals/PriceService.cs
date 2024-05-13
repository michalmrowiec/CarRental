namespace CarRental.Domain.Services.Rentals
{
    public class PriceService
    {
        private readonly decimal _discountRate;
        private readonly decimal _vatRate;
        private readonly decimal _netPricePerDay;
        private readonly int _days;

        public PriceService(decimal discountRate, decimal vatRate, decimal netPricePerDay, int days)
        {
            _discountRate = discountRate;
            _vatRate = vatRate;
            _netPricePerDay = netPricePerDay;
            _days = days;
        }

        public decimal GetTotalNetPriceWithoutDiscount()
        {
            return _netPricePerDay * _days;
        }

        public decimal GetTotalGrossPrice()
        {
            var totalNetPriceWithoutDiscount = GetTotalNetPriceWithoutDiscount();
            var discount = totalNetPriceWithoutDiscount * _discountRate;
            var totalNetWithDiscount = totalNetPriceWithoutDiscount - discount;
            var vat = totalNetWithDiscount * _vatRate;
            var totalGross = totalNetWithDiscount + vat;
            
            return totalGross;
        }
    }
}
