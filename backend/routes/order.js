const router = require('express').Router()

const { requireSignIn, isAuth } = require('../controllers/auth.js');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const { create } = require('../controllers/order')
const { decreseQuantity } = require('../controllers/product');


router.post('/order/create/:userId', requireSignIn, isAuth, addOrderToUserHistory, decreseQuantity, create );

router.param("userId", userById )

module.exports = router;