class ApiError extends Error {
    constructor(code, message, stacklist = null) {
      super(message);
      
      this.name = this.constructor.name; // Set the name property
      this.code = code; // HTTP status code or custom error code
      this.message = message
      this.stacklist = stacklist || this.stack; // Use the default stack trace if none is provided
    }
  }
  
  export default ApiError;
  