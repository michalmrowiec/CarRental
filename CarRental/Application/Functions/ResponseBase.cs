using FluentValidation.Results;

namespace CarRental.Application.Functions
{
    public class ResponseBase
    {
        public ResponseStatus Status { get; set; }
        public bool Success { get; set; }
        public string? Message { get; set; }
        public List<string>? ValidationErrors { get; set; }

        public ResponseBase()
        {
            Status = ResponseStatus.Success;
            Success = true;
            ValidationErrors = new();
        }

        public ResponseBase(bool status, string message, ResponseStatus responseStatus)
        {
            Status = responseStatus;
            Success = status;
            Message = message;
        }

        public ResponseBase(ValidationResult validationResult)
        {
            Status = ResponseStatus.ValidationError;
            Success = false;
            ValidationErrors = new();
            validationResult.Errors
                .ForEach(e => ValidationErrors.Add(e.ErrorMessage));
        }

        public ResponseBase(bool success, string? message, ValidationResult validationResult, ResponseStatus responseStatus)
        {
            Status = responseStatus;
            Success = success;
            Message = message;
            ValidationErrors = new();
            validationResult.Errors
                .ForEach(e => ValidationErrors.Add(e.ErrorMessage));
        }

        public enum ResponseStatus
        {
            Success = 0,
            NotFound = 1,
            BadQuery = 2,
            Error = 3,
            ValidationError = 4
        }
    }

    public class ResponseBase<T> : ResponseBase where T : class
    {
        public T? ReturnedObject { get; set; }

        public ResponseBase(T returnedObject)
        {
            Success = true;
            ValidationErrors = new();
            ReturnedObject = returnedObject;
        }

        public ResponseBase(ValidationResult validationResult) : base(validationResult) { }

        public ResponseBase(bool status, string message, ResponseStatus responseStatus)
            : base(status, message, responseStatus) { }

        public ResponseBase(bool status, string message, ResponseStatus responseStatus, T returnedObject)
            : base(status, message, responseStatus)
        {
            ReturnedObject = returnedObject;
        }
    }
}
