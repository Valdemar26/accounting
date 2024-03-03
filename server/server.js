const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const accountsData = require('../server/data/json/getAccounting.json');

server.get('/api/accounting', (req, res, next) => {
  res.status(200).send(accountsData.data.accounting);
});

server.get('/api/quarters', (req, res, next) => {
  res.status(200).send(accountsData.data.quarters);
});

server.listen(3000, () => {
  console.log('JSON server listening on port 3000');
});
