const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const conectarDB = require('./config/db');
const experienciaRoutes = require('./routes/experiencia');

conectarDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/experiencias', experienciaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const path = require('path');
app.use(express.static(path.join(__dirname, '../')));