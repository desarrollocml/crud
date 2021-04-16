const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

//const puntoenv = require('dotenv').config({ path: '.env'});
//require('dotenv').config({ path: '.env'});
//console.log('BASE ENV  '+ process.env.DB_URL);

const app = express();

//mongoose.set('useUnifiedTopology', true);
//app.set('urldb', process.env.DB_URL || 'mongodb://localhost/crud-mongo');
app.set('urldb', 'mongodb+srv://administrador:cmlcml@cluster0.gat0g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' || 'mongodb://localhost/crud-mongo');
// connection to db
//process.env.DB_URL    useNewUrlParser: true 
//mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,useUnifiedTopology:true })
mongoose.connect(app.get('urldb'),{ useNewUrlParser: true,useUnifiedTopology: true })
  .then(db => console.log('coneccion a base de datos'))
  .catch(err => console.log(err));

//mongoose.set('useUnifiedTopology', true);

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
// routes
app.use('/', indexRoutes);

app.listen(app.get('port'),app.get('host'),() => {
  console.log(`server on port ${app.get('port')} en la maquina ${app.get('host')}`);
});