const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Init
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Midelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users/', require(path.join(__dirname, 'routes', 'user.route')));

// Server ON
app.listen(app.get('port'), () => {
  console.log(`App ready on http://localhost:${app.get('port')}`);
});

module.exports = { app };
