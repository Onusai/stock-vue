const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// init env vars
require('dotenv').config({ path: '../.env' });
const isEnvProduction = ['production', 'prod', 'p'].includes(process.env.NODE_ENV);

// init express
const app = express();

// middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// routes
app.use('/api/quote', require('./routes/quote.js'));

// serve SPA from public directory
if (isEnvProduction) {
  app.use(express.static(path.join(__dirname, 'public')));
  app.get(/.*/, (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  );
}

const PORT = isEnvProduction ? process.env.PROD_PORT : process.env.DEV_PORT;

app.listen(PORT, (err) => {
  if (err) console.warn(err);
  else console.log(`\nServer started on http://localhost:${PORT}`);
});
