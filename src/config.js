const APP_ENV = import.meta.env.VITE_APP_ENV;
const APP_VERSION = import.meta.env.VITE_APP_VERSION;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log(API_BASE_URL)
export { APP_ENV, APP_VERSION, API_BASE_URL };
