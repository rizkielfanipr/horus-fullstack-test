const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/Database');

// Initialize dotenv
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

// Test database connection and sync models
sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error: ' + err));

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
