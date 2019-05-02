export default {
  URL: process.env.VUE_APP_LOCAL
    ? 'http://localhost:5000'
    : process.env.VUE_APP_API_URL,
};
