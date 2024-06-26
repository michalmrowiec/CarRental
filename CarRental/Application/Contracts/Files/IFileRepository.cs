﻿namespace CarRental.Application.Contracts.Files
{
    public interface IFileRepository
    {
        Task<string> SaveFileAsync(FileType fileType, byte[] fileData, string fileName);
        Task<(byte[] fileData, string filePath)> GetFileAsync(FileType fileType, string fileName);
        string[] GetAllFiles(FileType filesType);
        DeleteStatus DeleteFile(string filePath);
    }

    public enum FileType
    {
        VehicleImage
    }

    public enum DeleteStatus
    {
        Deleted,
        NotFound,
        Error
    }
}
