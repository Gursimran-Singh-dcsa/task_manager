class HttpErrorService extends Error {
  constructor(status, message = "Something went wrong", errors = []) {
    super(message);
    this.status = status;
    this.data = null;
    this.message = message;
    this.success = false;
    this.error = true;
    this.errors = errors;
  }
}

export default HttpErrorService;
