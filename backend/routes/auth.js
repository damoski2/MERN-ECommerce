const router = require('express').Router();

const { userSignUpValidator } = require('../validator');
const { signUp, signIn, signOut } = require('../controllers/auth.js');

//
router.post('/signUp',userSignUpValidator,signUp);

router.post('/signIn', signIn);

router.get('/signOut', signOut);


module.exports = router;