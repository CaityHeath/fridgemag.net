'use strict';

require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const cors = require('cors');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(cors());
app.get('/', (req, res) => {
  res.render('./index');
});

app.listen(PORT, () => console.log(`App is up on PORT ${process.env.PORT}`));