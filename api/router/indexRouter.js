const express = require("express");
const router = express.Router();

import userRouter from './userRouter'
import feedRouter from './feedRouter'

router.use('/users', userRouter.router)
router.use('/feed', feedRouter.router)
// router.use('/admin', adminRouter.router)

module.exports = router;