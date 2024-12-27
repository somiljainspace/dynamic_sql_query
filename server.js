const express = require('express');
const router = require('./routes/query');
const db = require('./db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});