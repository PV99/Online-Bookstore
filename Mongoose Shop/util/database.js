const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let shop_db;


const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://pridhvi:oQMsloLI1EFTrDIO@cluster0-lhw2i.mongodb.net/test?retryWrites=true&w=majority'
    ).then(client => {

        shop_db = client.db('shopMongoose');

        callback();
    }).catch(err => {
        console.log(err);
    })
}

const getShopDB = () => {

    if (shop_db) {
        return shop_db;
    }
    throw 'No database found';
}


exports.mongoConnect = mongoConnect;
exports.getShopDB = getShopDB;
