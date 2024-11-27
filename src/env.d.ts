declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_KEY: string;
  }
}
console.log("API Key:", process.env.REACT_APP_API_KEY);
