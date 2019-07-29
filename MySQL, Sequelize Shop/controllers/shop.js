const Product = require('../models/product');


exports.getProducts = (req, res, next) => {

  Product.findAll().then(products => {
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
  Product.findByPk(productId).then(product => {
    res.render('shop/product-detail', { product: product, pageTitle: product.title, path: "/products" })
  }).catch(err => {
    console.log(err);
  })


}

exports.addCart = (req, res, next) => {
  const productId = req.body.productID;
  let tempCart;
  let newQuantity = 1;
  req.user.getCart().then(cart => {

    tempCart = cart;
    return cart.getProducts({ where: { id: productId } })
  }).then(products => {
    let tempProduct;
    console.log("HELLO ", products.len, "\n\n\n\n")
    if (products.length > 0) {

      tempProduct = products[0];

    }
    if (tempProduct) {
      newQuantity = tempProduct.cartItem.quantity + 1;
      return tempProduct;
    }
    return Product.findByPk(productId)

  }).then(product => {

    return tempCart.addProduct(product, { through: { quantity: newQuantity } })

  }).then(() => {
    res.redirect("/cart")
  }).catch(err => {
    console.log(err);
  })



}

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
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
  req.user.getCart().then(cart => {
    return cart.getProducts()
  }).then(products => {

    res.render('shop/cart', {
      products: products,
      path: '/cart',
      pageTitle: 'Your Cart'
    })
  }).catch(err => {
    console.log(err);
  })
  /*
  Product.fetchAll(products => {
    const CartProducts = [];
    for (product of products) {
      const cartProductData = cart.products.find(prod => prod.id === product.id)
      if (cartProductData) {
        CartProducts.push({ productData: product, qty: cartProductData.qty });
      }
    }
    res.render('shop/cart', {
      products: CartProducts,
      price: cart.price,
      path: '/cart',
      pageTitle: 'Your Cart'
    });
    */
};

exports.removeFromCart = (req, res, next) => {
  let tempCart;
  const prodId = req.body.productID;
  req.user.getCart().then(cart => {
    tempCart = cart;
    return cart.getProducts({ where: { id: prodId } })

  }).then(products => {
    const product = products[0];
    product.cartItem.destroy();

  }).then(() => {
    res.redirect("/cart");
  })
    .catch(err => {
      console.log(err);
    })

  /*
  Product.findByID(prodId, prod => {
    Cart.deleteByID(prodId, prod.price)
    res.redirect("/cart");
  })
  */
}

exports.getOrders = (req, res, next) => {

  req.user.getOrders({include: ['products']}).then(orders => {

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
  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts();

  }).then(products => {
    tempProducts = products;
    return req.user.createOrder()

  }).then(order => {
    return order.addProducts(tempProducts.map(prod => {
      prod.orderItem = { quantity: prod.cartItem.quantity };
      return prod;

    }))

  }).then(result => {
    return fetchedCart.setProducts(null)

  }).then(() => {
    res.redirect('/orders');

  }).catch(err => {
    console.log(err);
  })

}