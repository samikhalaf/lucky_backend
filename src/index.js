const express = require('express');

const apiRoutes = require('./routes/index.routes');

const server = express();

server.use(apiRoutes) // MIDDLEWARE



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Conectados a http://localhost:${PORT}`)
});
