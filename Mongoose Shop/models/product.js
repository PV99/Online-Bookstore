
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

/* const getShopDB = require('../util/database').getShopDB;
const mongodb = require('mongodb');

class Product {
  constructor(title, price, description, imageURL, id, userId) {
    this.title = title,
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId
  }

  save() {
    const db = getShopDB();
    let operation;
    if (this._id) {

      operation = db.collection('products').updateOne({ _id: this._id }, { $set: this });
    }
    else {
      operation = db.collection('products').insertOne(this)
    }
    return operation.then(result => {
      console.log(result);
    })
      .catch(err => console.log(err))
  }

  delete() {
    const db = getShopDB();
    return db.collection('products').deleteOne({ _id: this._id }).catch(err => {
      console.log(err);
    })

  }

  static fetchAll() {
    const db = getShopDB();
    return db.collection('products').find().toArray().then(products => {

      return products;

    }).catch(err => {
      console.log(err)
    })
  }

  static findById(prodId) {
    const db = getShopDB();
    return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next().then(product => {
      console.log(product);
      return product;
    }).catch(err => {

      console.log(err);
    })
  }

}

module.exports = Product;
*/