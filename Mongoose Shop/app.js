const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose')
const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

    User.findById("5d315c3bf111d363682487fa").then(user => {

        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    });


})


app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

mongoose.connect('mongodb+srv://pridhvi:oQMsloLI1EFTrDIO@cluster0-lhw2i.mongodb.net/shopMongoose?retryWrites=true&w=majority')
    .then(result => {
        return User.findOne().then(user => {

            if (!user) {
                const user = new User({
                    name: 'PV',
                    email: 'PV@test.com',
                    cart: [],
                })

                return user.save()
            }

            return;

        })

    }).then(() => {
        app.listen(3000)
    }).catch(err => {
        console.log(err);
    })