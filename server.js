// backend/server.js
import dotenv from 'dotenv';
import app from './src/app.js';
import rolRoutes from './src/routes/rolRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use('/api', rolRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
