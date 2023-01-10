import feedService from '../service/feedService'
import { catchAsync } from '../utils/error'

//? MOCK DATA
let feedDB = [{
    "id" : 1,
    "title" : "title1",
    "content" : "content1",
}]

export default {
//? SEQUELIZE
    get_all_posts : catchAsync(async(req, res) => {
        const result = await feedService.get_all_posts();
        res.status(200).json(result)
    }),

    add_post : catchAsync(async(req, res) => {
        const {title, content} = req.body;

        if (!title || !content) throw new Error('keyError')

        const result = await feedService.add_post(title, content)
        res.status(201).json(result)
        
    }),

    update_post_content : catchAsync(async(req, res) => {
        const post_id = req.params.post_id;
        const { content } = req.body;

        if (!content) throw new Error('key_error')

        const [result] = await feedService.update_post_content(post_id, content)
        res.status(200).json(result)
    }),
        
    delete_post : catchAsync(async(req, res) => {
        const post_id = req.params.post_id;
        await feedService.delete_post(post_id)
        res.status(204).json()
    }),


//? MOCK DATA FUNCTIONS
    addPost(req, res) {
        try {    
            const {title, content} = req.body;
            // const userId = req.user.id;
            
            if (!title || !content) throw new Error('keyErr')

            feedDB.push({
                "title" : title,
                "content" : content,
            })
            res.status(201).json({feedDB})
        } catch (err) {
            if (err.message == 'keyErr') {
                const error = new Error('KEY_ERROR')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            } else {
                const error = new Error('CANNOT_ADD_POST')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            }
        }
    },

    editContent(req, res) {
        try {
            const {index, content} = req.body;

            if (!index || !content) throw new Error('keyErr')

            feedDB[index].content = content;
            res.status(200).json({feedDB})
        } catch (err) {
            if (err.message == 'keyErr') {
                const error = new Error('KEY_ERROR')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            } else {
                const error = new Error('CANNOT_EDIT_CONTENT')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            }
        }
    },

    getFeed(req, res) {
        res.status(200).json({feedDB})
    },

    deletePostByIndex(req, res) {
        try {
            const postIndex = req.params.postIndex;

            if (!feedDB[postIndex]) throw new Error('keyErr')

            feedDB.splice(postIndex, 1);
            res.status(200).json({feedDB})
        } catch (err) {
            if (err.message == 'keyErr') {
                const error = new Error('NO_POST_TO_DELETE')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            } else {
                const error = new Error('CANNOT_DELETE_POST')
                error.statusCode = 400;
                res.status(error.statusCode).json({ error : true, message : error.message })
            }
        }
    },
}