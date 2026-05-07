const express = require('express');
const rotasitens = require('./routes/itens');

const  app = express();
const PORT = 3000

app.use(express.json());


app.use('/itens', rotasitens);

app.listen(PORT, () => {
    console.log('servidor rodando em http://localhost:${PORT}');
});