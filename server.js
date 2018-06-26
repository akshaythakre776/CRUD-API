// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(3000, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:3000/');
var express = require('express');
    wines = require('./routes/api');
    const http = require('http');
var app = express();
const bodyParser= require('body-parser');
server = http.createServer(app);

// app.get('/wines', function(req, res) {
//     res.send([{name:'wine1'}, {name:'wine2'}]);
// });
// app.get('/wines/:id', function(req, res) {
//     res.send({id:req.params.id, name: "The Name", description: "description"});
// });


// app.configure(function () {
//     app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
//     app.use(express.bodyParser());
// });
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api', wines.findAll);
app.get('/api/:ssn', wines.findById);
app.post('/api/post', wines.addWine);
app.put('/api/:ssn', wines.updateWine);
app.delete('/api/:ssn', wines.deleteWine);

app.listen(3000);
console.log('Listening on port 3000...');
console.log('Nagivate to http://10.102.8.101:3000/api/');

server.close(function(){
    server.listen(3000,'10.102.8.101')
   })