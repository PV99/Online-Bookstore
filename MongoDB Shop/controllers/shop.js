const Product = require('../models/product');


exports.getProducts = (req, res, next) => {

  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });

  }).catch(err => {

    console.log(err);
  })

};


exports.productDetails = (req, res, next) => {
  const productId = req.params.productID;
  Product.findById(productId).then(product => {
    res.render('shop/product-detail', { product: product, pageTitle: product.title, path: "/products" })
  }).catch(err => {
    console.log(err);
  })
}

exports.addCart = (req, res, next) => {
  const productId = req.body.productID;
  Product.findById(productId).then(product => {
    return req.user.addToCart(product).then(result => {
      res.redirect('/cart')
    }).catch(err => {
      console.log(err);
    })
  })

}


exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });

  }).catch(err => {

    console.log(err);
  })

};


exports.getCart = (req, res, next) => {
  req.user.getCart().then(products => {

    res.render('shop/cart', {
      products: products,
      path: '/cart',
      pageTitle: 'Your Cart'
    })
  }).catch(err => {
    console.log(err);
  })

};

exports.removeFromCart = (req, res, next) => {

  const prodId = req.body.productID;
  req.user.deleteFromCart(prodId).then(result => {
    res.redirect('/cart')

  }).catch(err => {
    console.log(err);
  })
}

exports.getOrders = (req, res, next) => {

  req.user.getOrders().then(orders => {

    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders,
    });
  }).catch(err => {
    console.log(err);
  })

};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.postOrders = (req, res, next) => {

  let tempProducts;
  let fetchedCart;
  req.user.addOrder().then(() => {
    res.redirect('/orders');

  }).catch(err => {
    console.log(err);
  })

}