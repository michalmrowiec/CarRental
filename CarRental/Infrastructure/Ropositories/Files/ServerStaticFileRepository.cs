﻿using CarRental.Application.Contracts.Files;

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
