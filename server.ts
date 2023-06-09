import app from './src';
import config from './src/config/config';
const PORT = config.port || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => console.log(`Exiting...`));
});
