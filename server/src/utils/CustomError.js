class CustomError extends Error {
    constructor(message, code) {
      super(message);
  
      this.name = 'CustomError'; 
      this.code = code; 
    }
  }
  
// EG:-
//   try {
//     throw new CustomError('This is a custom error message', 500);
//   } catch (error) {
//     console.error(error.name); // Output: CustomError
//     console.error(error.message); // Output: This is a custom error message
//     console.error(error.code); // Output: 500
//     console.error(error.stack); // Output: Stack trace information
//   }
  
export {CustomError}