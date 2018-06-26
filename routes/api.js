// exports.findAll = function(req, res) {
//     res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
// };

// exports.findById = function(req, res) {
//     res.send({id:req.params.id, name: "The Name", description: "description"});
// };

var mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient 

var Server = mongo.Server,
    // Db = mongo.Db,
    BSON = mongo.BSONPure;

// var server = new Server('localhost', 27017, {auto_reconnect: true});
// db = new Db('mainframe', server);

var db
MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
  if (err) return console.log(err)
  db = client.db('mainframe') // whatever your database name is
});

// db.open(function(err, db) {
//     if(!err) {
//         console.log("Connected to 'Mainframe' database");
//         db.collection('customer', {strict:true}, function(err, collection) {
//             if (err) {
//                 console.log("The 'Customer' collection doesn't exist. Creating it with sample data...");
//                 populateDB();
//             }
//         });
//     }
// });

exports.findById = function(req, res) {
    var ssn = req.params.ssn;
    // console.log('Retrieving customer: ' + ssn);
    db.collection('customer', function(err, collection) {
        collection.findOne({ 'ssn': ssn }, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('customer', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addWine = function(req, res) {
    var wines = req.body;
    console.log('Adding customer: ' + JSON.stringify(wines));
    db.collection('customer', function(err, collection) {
        collection.insert(wines, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                // console.log('Success: ' + JSON.stringify(result[0]));
                console.log('Success');
                res.send(result[0]);
            }
        });
    });
}

exports.updateWine = function(req, res) {
    var ssn = req.params.ssn;
    var wines = req.body;
    console.log('Updating customer: ' + ssn);
    console.log(JSON.stringify(wines));
    db.collection('customer', function(err, collection) {
        collection.update({'ssn':ssn}, wines, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating customer: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wines);
            }
        });
    });
}

exports.deleteWine = function(req, res) {
    var ssn = req.params.ssn;
    console.log('Deleting customer: ' + ssn);
    db.collection('customer', function(err, collection) {
        collection.remove({'ssn':ssn}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}