const express = require('express')
const router = express.Router();
import feedController from '../controller/feedController'

//? SEQUELIZE
router.get('', feedController.get_all_posts)
router.post('', feedController.add_post)
router.patch('/:post_id', feedController.update_post_content)
router.delete('/:post_id', feedController.delete_post)

//? MOCK DATA
// router.post('', feedController.addPost)
// router.get('', feedController.getFeed)
// router.patch('', feedController.editContent)
// router.delete('/:postIndex', feedController.deletePostByIndex)

module.exports = {
    router
}