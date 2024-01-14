class ResponseService {
  constructor(status, data = {}, message = "Success") {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = true;
    this.error = false;
  }
  getResponse() {
    return {
      status: this.status,
      data: this.data,
      message: this.message,
      success: this.success,
      error: this.error
    };
  }
}
export default ResponseService;
