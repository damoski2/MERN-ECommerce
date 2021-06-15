const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const app = express();
require('dotenv').config();

//Imports routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

//middlewares
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors());
app.use(expressValidator());

//Database connection
mongoose.connect(process.env.MONGO_LOCAL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=> console.log(`DB Connected`));

mongoose.connection.on('error',err=>{
    console.log(`DB connection error: ${err.message}`);
})

//routes
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',braintreeRoutes);
app.use('/api',orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running  on port ${port}`);
});
