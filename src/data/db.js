/*


Collections:
    user-state: holds the state of the user's page


*/


// Using namespace MDB
const MDB = {};

// Import mongo inside the namespace
MDB.mongo = require('mongodb');

// 
MDB.MongoClient = MDB.mongo.MongoClient; 
MDB.url = "mongodb://localhost:27017/planner";

MDB.useMongo = MDB.mongo.MongoClient.connect.bind(
    MDB.mongo.MongoClient.connect,
    MDB.url, 
    {useUnifiedTopology: true}
);

MDB.init = function initialState() {
    useMongo((err, db) => {
        if (err) {
            console.log("Error:\tuseMongo could not connect to mongo");
            console.log(`\t\t${error}`);
            return;
        };

        let database = db.db('planner');
        console.log("\tSuccess: Database created");

        // user-state: holds the state of the user's page
        database.createCollection('user-state', (err, res) => {
            if (err) {
                console.log('\tError:\tcreateCollection user-state failed');
                console.log(`\t\t\t${error}`);
                return;
            };

            console.log("\tSuccess: user-state created")
        });

        database.collection('user-state').insertOne({
            user: 'admin',
                state: -1,
                description: 'initial development'
        });
        db.close()
    });
};


exports.MDB;