/**
 * Global API configuration for mobile/network access.
 * Replace 'localhost' with the local IP of your computer to allow mobile devices to connect.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000/api`;

export default API_BASE_URL;
