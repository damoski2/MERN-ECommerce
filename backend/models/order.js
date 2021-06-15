const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const CartItemSchema = new Schema({
    product:{
        type: ObjectId,
        ref: 'Product'
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    count: {
        type: Number
    }
},{ timestamps: true })

const CartItem = mongoose.model('CartItem', CartItemSchema);



const OrderSchema = new Schema({
    products: [CartItemSchema],
    transaction_id: {
        type: String
    },
    amount: {
        type: Number
    },
    address: {
        type: String
    },
    status:{
        type: String,
        default: "Not processed",
        enum: ["Not processed","Processing","Shipped","Delivered","Cancelled"]
    },
    update: Date,
    user: {
        type:ObjectId,
        ref: 'User'
    }
},{ timestamps: true });

const Order = mongoose.model('Order',OrderSchema);

module.exports = {Order,CartItem};