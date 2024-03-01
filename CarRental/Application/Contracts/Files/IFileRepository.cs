namespace CarRental.Application.Contracts.Files
{
    public interface IFileRepository
    {
        Task<string> SaveFileAsync(FileType fileType, byte[] fileData, string fileName);

        Task<byte[]> GetFileAsync(FileType fileType, string fileName);

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
