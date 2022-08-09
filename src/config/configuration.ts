export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    openWeatherKey: process.env.OPEN_WEATHER_KEY || null,
    mongoURI: process.env.MONGO_URI || null
});
  