const router = require('express').Router();

const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth.js');

const { userById, read, update, purchaseHistory } = require('../controllers/user');

router.get('/secret/:userId', requireSignIn , isAuth , isAdmin, (req,res)=>{
    res.json({
        user: req.profile
    })
})

router.get("/user/:userId", requireSignIn , isAuth, read )
router.put("/user/:userId", requireSignIn , isAuth, update )
router.get("/orders/by/user/:userId", requireSignIn , isAuth, purchaseHistory )

//
router.param('userId', userById)


module.exports = router;