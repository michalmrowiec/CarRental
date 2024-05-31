using CarRental.Application.Contracts.Files;
using Microsoft.VisualBasic.FileIO;

namespace CarRental.Infrastructure.Ropositories.Files
{
    public class ServerStaticFileRepository : IFileRepository
    {
        private readonly ILogger<ServerStaticFileRepository> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private string _basePath;

        public ServerStaticFileRepository(ILogger<ServerStaticFileRepository> logger, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;

            _basePath = Path.Combine(_webHostEnvironment.ContentRootPath, "ClientApp", "src", "images") ;
        }

        public DeleteStatus DeleteFile(string filePath)
        {
            filePath = Path.Combine("ClientApp", "src", filePath);
            if (!File.Exists(filePath))
            {
                _logger.LogWarning("Try of delete file {FileName}, but file does not exists.", filePath);
                return DeleteStatus.NotFound;
            }

            try
            {
                File.Delete(filePath);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unable to delete {FileName} file.", filePath);
                return DeleteStatus.Error;
            }

            return DeleteStatus.Deleted;
        }

        public string[] GetAllFiles(FileType filesType)
        {
            var directoryPath = Path.Combine(_basePath, filesType.ToString());
            string[] files = Directory.GetFiles(directoryPath);

            List<string> filesPaths = new();

            foreach (var file in files)
            {
                filesPaths.Add(Path.Combine("images", filesType.ToString(), Path.GetFileName(file)));
            }
            return filesPaths.ToArray();

        }

        public async Task<(byte[] fileData, string filePath)> GetFileAsync(FileType fileType, string fileName)
        {
            byte[] fileData = Array.Empty<byte>();

            var filePath = Path.Combine(_basePath, fileType.ToString(), fileName);

            if (!File.Exists(filePath))
            {
                _logger.LogWarning("File {FileName} does not exists.", fileName);
                return (fileData, Path.Combine("images", fileType.ToString(), fileName));
            }

            try
            {
                fileData = await File.ReadAllBytesAsync(filePath);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Unable to get {FileName} file.", fileName);
            }

            return (fileData, Path.Combine("images", fileType.ToString(), fileName));
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

            return Path.Combine("images", fileType.ToString(), fileName);
        }
    }
}
