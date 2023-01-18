const express = require("express");
const router = express.Router();

import userRouter from './userRouter'
import feedRouter from './feedRouter'
import kakaoMap from '../kakao/map'
import googleMap from '../google/map'

router.use('/users', userRouter.router)
router.use('/feed', feedRouter.router)
router.get('/markers', kakaoMap.get_markers)
router.get('/companies', googleMap.get_companies)
router.get('/nearby', googleMap.get_nearby)

module.exports = router;