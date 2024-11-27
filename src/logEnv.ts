import dotenv from "dotenv"; // Use ES module import syntax
dotenv.config(); // Load .env file into process.env

console.log("API Key:", process.env.REACT_APP_API_KEY);

export {}; // Ensure the file is treated as a module
