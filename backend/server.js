// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
const configureExpress = require('./config/express.js');

// Create a new Express application instance
const app = configureExpress();

// Use the Express app instance to listen to the '5000' port
app.listen(5000);

// Log the server status to the console
console.log('Server running at http://localhost:5000/');

// Use module.exp property to expose Express app instance for external usage
module.exports = app;