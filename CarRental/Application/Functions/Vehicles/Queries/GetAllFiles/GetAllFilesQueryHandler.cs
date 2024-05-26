using CarRental.Application.Contracts.Files;
using MediatR;

namespace CarRental.Application.Functions.Vehicles.Queries.GetAllFiles
{
    public class GetAllFilesQueryHandler : IRequestHandler<GetAllFilesQuery, ResponseBase<string[]>>
    {
        private readonly IFileRepository _fileRepository;

        public GetAllFilesQueryHandler(IFileRepository fileRepository)
        {
            _fileRepository = fileRepository;
        }

        public Task<ResponseBase<string[]>> Handle(GetAllFilesQuery request, CancellationToken cancellationToken)
        {
            return Task.FromResult(new ResponseBase<string[]>(_fileRepository.GetAllFiles(request.FilesType)));
        }
    }
}
