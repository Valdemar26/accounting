const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

const accountsData = require('../server/data/json/getAccounting.json');

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use(middleware);
server.use(jsonServer.bodyParser);

server.get('/api/accounting', (req, res, next) => {
  res.status(200).send(accountsData.data.accounting);
});

server.get('/api/quarters', (req, res, next) => {
  res.status(200).send(accountsData.data.quarters);
});

server.listen(3000, () => {
  console.log('JSON server listening on port 3000');
});
