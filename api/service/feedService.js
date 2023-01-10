import feedDao from '../model/feedDao'

export default {
    get_all_posts : () => {
        return feedDao.get_all_posts()
    },

    add_post : (title, content) => {
        return feedDao.add_post(title, content)
    },

    update_post_content : (post_id, content) => {
        return feedDao.update_post_content(post_id, content)
    },

    delete_post : (post_id) => {
        return feedDao.delete_post(post_id)
    }
}