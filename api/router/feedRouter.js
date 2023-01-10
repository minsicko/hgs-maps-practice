const express = require('express')
const router = express.Router();
import feedController from '../controller/feedController'

router.post('', feedController.addPost)
router.get('', feedController.getFeed)
router.patch('', feedController.editContent)
router.delete('/:postIndex', feedController.deletePostByIndex)

module.exports = {
    router
}