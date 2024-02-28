using FluentValidation.Results;

namespace CarRental.Application.Functions
{
    public class ResponseBase
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public List<string>? ValidationErrors { get; set; }

        public ResponseBase()
        {
            Success = true;
            ValidationErrors = new();
        }

        public ResponseBase(bool status, string message)
        {
            Success = status;
            Message = message;
        }

        public ResponseBase(ValidationResult validationResult)
        {
            Success = false;
            ValidationErrors = new();
            validationResult.Errors
                .ForEach(e => ValidationErrors.Add(e.ErrorMessage));
        }

        public ResponseBase(bool success, string? message, ValidationResult validationResult)
        {
            Success = success;
            Message = message;
            ValidationErrors = new();
            validationResult.Errors
                .ForEach(e => ValidationErrors.Add(e.ErrorMessage));
        }
    }

    public class ResponseBase<T> : ResponseBase where T : class
    {
        public T? ReturnedObj { get; set; }

        public ResponseBase(T obj)
        {
            Success = true;
            ValidationErrors = new();
            ReturnedObj = obj;
        }

        public ResponseBase(ValidationResult validationResult) : base(validationResult) { }

        public ResponseBase(bool status, string message) : base(status, message) { }
    }
}
