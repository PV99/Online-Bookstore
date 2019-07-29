

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    email: {

        type: String,
        required: true,
    },
    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }
        ],
    },

})

userSchema.methods.clearCart = function() { 

    this.cart.items = []; 
    this.save(); 
}

userSchema.methods.addToCart = function (product) {

    const cartProductIndex = this.cart.items.findIndex((prod) => product._id.toString() == prod.productId.toString());
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    }

    else {
        updatedCartItems.push({ productId: product._id, quantity: newQuantity })
    }

    let updatedCart = { items: updatedCartItems }


    this.cart = updatedCart;
    return this.save()

}

userSchema.methods.removeFromCart = function (prodId) {
    const updatedCartItems = this.cart.items.filter(prod => prod.productId.toString() != prodId.toString());
    const updatedCart = { items: updatedCartItems }
    this.cart.items = updatedCart.items;
    return this.save()
}

module.exports = mongoose.model("User", userSchema)

/* const getShopDB = require('../util/database').getShopDB;
const mongodb = require('mongodb');

class User {

    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart; //{items: []}
        this._id = id;
    }

    save() {
        const db = getShopDB();
        return db.collection('users').insertOne(this).catch(err => {
            console.log(err);
        })

    }

    getCart() {

        const db = getShopDB();
        return db.collection('products').find({ _id: { $in: this.cart.items.map(i => i.productId) } }).toArray()
            .then(products => {

                return products.map(p => ({
                    ...p,
                    quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                }))
            })

    }

    addToCart(product) {

        const cartProductIndex = this.cart.items.findIndex((prod) => product._id.toString() == prod.productId.toString());
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if (cartProductIndex >= 0) {

            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }

        else {
            updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity })
        }


        let updatedCart = { items: updatedCartItems }
        const db = getShopDB();

        return db
            .collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            );
    }

    deleteFromCart(prodId) {
        const updatedCartItems = this.cart.items.filter(prod => prod.productId.toString() != prodId.toString());
        const updatedCart = { items: updatedCartItems }
        const db = getShopDB();

        return db.collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            );

    }

    getOrders() {

        const db = getShopDB();
        return db.collection('orders').find({ 'user._id': new mongodb.ObjectId(this._id) }).toArray()

    }

    addOrder() {
        const db = getShopDB();
        return this.getCart()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: new mongodb.ObjectId(this._id),
                        name: this.name,

                    },
                }
                return db.collection('orders').insertOne(order)
            }).then(result => {
                this.cart = { items: [] }
                return db.collection('users')
                    .updateOne(
                        { _id: new mongodb.ObjectId(this._id) },
                        { $set: { cart: this.cart } }
                    );

            })

    }

    static findById(id) {

        const db = getShopDB();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) }).then(result => {
            return result;
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = User;
*/