const http = require('http');
const app = require('./app'); // app file include
 const port = process.env.PORT || 3042;

 const server = http.createServer(app);

 server.listen(port);