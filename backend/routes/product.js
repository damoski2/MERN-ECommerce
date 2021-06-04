const router = require('express').Router();

const {  } = require('../controllers/auth.js');
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth.js');
const { userById } = require('../controllers/user');

const { create, productById, read , remove, update, list, listRelated, listCategories, listBySearch, listSearch, photo } = require('../controllers/product');

//
router.post("/product/create/:userId", requireSignIn, isAuth, isAdmin, create);

router.get("/product/:productId", read);

router.delete("/product/:productId/:userId", requireSignIn, isAuth, isAdmin, remove);

router.put("/product/:productId/:userId", requireSignIn, isAuth, isAdmin, update);

router.get("/products", list)

router.get("/products/search", listSearch);

router.get("/products/related/:productId", listRelated)

router.get("/products/categories", listCategories)

router.post("/products/by/search", listBySearch);

router.get("/product/photos/:productId", photo)

router.param("userId", userById);
router.param("productId", productById)

module.exports = router;