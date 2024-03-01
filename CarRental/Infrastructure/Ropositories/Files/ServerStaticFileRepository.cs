using CarRental.Application.Contracts.Files;

namespace CarRental.Infrastructure.Ropositories.Files
{
    public class ServerStaticFileRepository : IFileRepository
    {
        private readonly ILogger<ServerStaticFileRepository> _logger;
        private readonly string _basePath = Path.Combine("ClientApp", "src", "images");

        public ServerStaticFileRepository(ILogger<ServerStaticFileRepository> logger)
        {
            _logger = logger;
        }

        public async Task<byte[]> GetFileAsync(FileType fileType, string fileName)
        {
            byte[] fileData = Array.Empty<byte>();

            var filePath = Path.Combine(_basePath, fileType.ToString(), fileName);

            if (!File.Exists(filePath))
            {
                _logger.LogWarning("File {FileName} does not exists.", fileName);
                return fileData;
            }

            try
            {
                fileData = await File.ReadAllBytesAsync(filePath);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Unable to get {FileName} file.", fileName);
            }

            return fileData;
        }

        public async Task<string> SaveFileAsync(FileType fileType, byte[] fileData, string fileName)
        {
            var directoryPath = Path.Combine(_basePath, fileType.ToString());
            Directory.CreateDirectory(directoryPath);

            var filePath = Path.Combine(directoryPath, fileName);

            if (File.Exists(filePath))
            {
                _logger.LogWarning("File {FileName} already exists.", fileName);
                return "";
            }

            try
            {
                using var stream = File.Create(filePath);
                await stream.WriteAsync(fileData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to save file {FileName}", fileName);
                return "";
            }

            return Path.Combine("images", fileType.ToString(), fileName); ;
        }
    }
}
