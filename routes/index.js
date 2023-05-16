const express = require('express');
const router = express.Router();
const productRouter = require ("./productroutes")
const userRouter = require ("./usersroutes")
const categoryRouter = require ("./categoryroute")
router.use(productRouter,userRouter,categoryRouter)
module.exports = router;