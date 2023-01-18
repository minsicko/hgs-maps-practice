const express = require('express')
const router = express.Router();
import userController from '../controller/userController'

router.get('/all', userController.get_all_users)

router.post('', userController.addUser)
router.get('/:index', userController.getUserByIndex)
router.patch('', userController.updateUser)
router.delete('/:index', userController.deleteUser)

module.exports = {
    router
}