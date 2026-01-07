const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-production-backend-url.com'
  : 'http://localhost:8080';

export default API_BASE_URL;
