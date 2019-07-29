const Product = require('../models/product');
const mongodb = require('mongodb');
//const Cart = require('../models/cart');


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    res.redirect('/')
  }
  else {
    const productId = req.params.productID;
    Product.findById(productId).then(product => {
      if (!product) {

        return res.redirect('/')
      }

      res.render('admin/edit-product', {
        pageTitle: 'EditProduct',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      });
    }).catch(err => {
      console.log(err);
    })
  }

};


exports.postEditProduct = (req, res, next) => {

  const prodID = req.body.productID;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findById(prodID).then(product => {

    product.title = title;
    product.imageURL = imageUrl;
    product.price = price;
    product.description = description;

    return product.save()

  }).then(result => {
    res.redirect('/admin/products')
  }).catch(err => {
    console.log(err);
  })
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  console.log("chilling\n\n");
  const product = new Product({ title, price, description, imageURL: imageUrl, userId: req.user })

  product.save()
    .then(result => {
      res.redirect("/admin/products");
    }).catch(err => {
      console.log(err)
    })

};

exports.getProducts = (req, res, next) => {
  Product.find().populate('userId').then(products => {
    console.log(products)
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => {
    console.log(err);
  })
};

exports.postDeleteProduct = (req, res, next) => {

  const prodID = req.body.productID;
  Product.findByIdAndRemove(prodID).then(() => {
    res.redirect("/admin/products");
  }).catch(err => {
    console.log(err);
  })



}