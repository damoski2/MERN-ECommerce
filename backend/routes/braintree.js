const router = require('express').Router()

const { requireSignIn, isAuth } = require('../controllers/auth.js');
const { userById } = require('../controllers/user');
const {generateToken,processPayment} = require('../controllers/braintree')



router.get('/braintree/getToken/:userId', requireSignIn, isAuth, generateToken )

router.post('/braintree/payment/:userId', requireSignIn, isAuth, processPayment )

router.param("userId", userById )

module.exports = router;