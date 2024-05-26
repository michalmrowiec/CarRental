using CarRental.Application.Contracts.Files;
using MediatR;

namespace CarRental.Application.Functions.Vehicles.Queries.GetAllFiles
{
    public record GetAllFilesQuery(FileType FilesType) : IRequest<ResponseBase<string[]>>;
}
