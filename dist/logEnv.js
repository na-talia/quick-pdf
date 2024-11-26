Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv"); // Import dotenv to load environment variables
dotenv.config(); // Load .env file into process.env
console.log("API Key:", process.env.REACT_APP_API_KEY);
