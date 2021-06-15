const router = require('express').Router()

const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth.js');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const { create, listOrders, getStatusValues, orderById, updateOrderStatus } = require('../controllers/order')
const { decreseQuantity } = require('../controllers/product');


router.post('/order/create/:userId', requireSignIn, isAuth, addOrderToUserHistory, decreseQuantity, create );

router.get('/order/list/:userId', requireSignIn, isAuth, isAdmin, listOrders)

router.get('/order/status-values/:userId', requireSignIn, isAuth, isAdmin, getStatusValues)

router.put('/order/:orderId/status/:userId', requireSignIn, isAuth, isAdmin, updateOrderStatus)

router.param("userId", userById )
router.param("orderId", orderById)

module.exports = router;