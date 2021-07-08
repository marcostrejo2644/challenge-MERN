const express = require('express');
const path = require('path');
const cors = require('cors');

// Init
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 4000);

// Midelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/users/', require(path.join(__dirname, 'routes', 'user.route')));
app.use('/api/login/', require(path.join(__dirname, 'routes', 'login.route')));

// Server ON
const server = app.listen(app.get('port'), () => {
  console.log(`App ready on http://localhost:${app.get('port')}`);
});

module.exports = { app, server };
