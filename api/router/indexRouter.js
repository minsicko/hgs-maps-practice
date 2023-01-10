const express = require("express");
const router = express.Router();

import userRouter from './userRouter'
import feedRouter from './feedRouter'

router.use('/users', userRouter.router)
router.use('/feed', feedRouter.router)

module.exports = router;