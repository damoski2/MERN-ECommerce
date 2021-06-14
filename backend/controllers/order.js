const {Order, CartItem} = require('../models/order')
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req,res)=>{
    console.log('CREATE AORDER ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
}