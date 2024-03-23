const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();
const fs = require('fs');

const accountsData = require('../server/data/json/getAccounting.json');
const path = require('path');
const filePath = path.join(__dirname, '../server/data/json/getAccounting.json');

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

server.post('/api/quarters', (req, res, next) => {

  const newQuarters = req.body;

  accountsData.data.quarters.push(newQuarters);

  fs.writeFileSync(filePath, JSON.stringify(accountsData));
  res.status(201).send(newQuarters);
});

server.patch('/api/quarters/:id', (req, res, next) => {
  const id = req.params.id;
  const updatedQuarters = req.body;

  const index = accountsData.data.quarters.findIndex(quarters => quarters.id === id);
  if (index !== -1) {
    accountsData.data.quarters[index] = updatedQuarters;
    fs.writeFileSync(filePath, JSON.stringify(accountsData));
    res.status(200).send(updatedQuarters);
  } else {
    res.status(404).send('Quarters not found');
  }
});

server.delete('/api/quarters/:id', (req, res, next) => {
  const id = req.params.id;

  const index = accountsData.data.quarters.findIndex(quarters => quarters.id === id);

  if (index !== -1) {
    accountsData.data.quarters.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(accountsData));
    res.status(204).send();
  } else {
    res.status(404).send('Quarters not found');
  }
});

server.listen(3000, () => {
  console.log('JSON server listening on port 3000');
});
