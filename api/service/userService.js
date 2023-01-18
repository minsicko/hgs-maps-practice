import userDao from '../model/userDao'

export default {
    get_all_users () {
        return userDao.get_all_users()
    }
}