const express = require('express');
const app = express();

// gets jwtPrivateKey from env variable
require('./startup/config')();

// db connection
require('./startup/db')();

// app.use routes module
require('./startup/routes')(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

// export server for integration tests
module.exports = server;