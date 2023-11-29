class ResMsg {
    constructor(statusCode, message) {
      this.statusCode = statusCode;
      this.message = message;
    }
  
    send(res) {
      res.status(this.statusCode).json({
        status: this.statusCode,
        message: this.message,
      });
    }
  }
  
  export default ResMsg;
  

//   import ResMsg from './path/to/ResMsg.js';

// Example usage in an Express route
// app.get('/example', (req, res) => {
//   const responseMsg = new ResMsg(200, 'Success!');
//   responseMsg.send(res);
// });