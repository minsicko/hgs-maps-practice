let feedDB = [{
    // "id" : "1",
    "title" : "title1",
    "content" : "content1",
    // "userId" : "1",
    // "created_at" : "2023-01-09",
    "views" : "100",
    "recommended" : "10"
},
{
    // "id" : "2",
    "title" : "title2",
    "content" : "content2",
    // "userId" : "2",
    // "created_at" : "2023-01-09",
    "views" : "200",
    "recommended" : "20"
}];

export default {
    addPost(req, res) {
        const {title, content} = req.body;
        // const userId = req.user.id;
        feedDB.push({
            "title" : title,
            "content" : content,
        })
        res.status(201).json({feedDB})
    },

    editContent(req, res) {
        const {index, content} = req.body;
        feedDB[index].content = content;
        res.status(200).json({feedDB})
    },

    getFeed(req, res) {
        res.status(200).json({feedDB})
    },

    deletePostByIndex(req, res) {
        const postIndex = req.params.postIndex;
        feedDB.splice(postIndex, 1);
        res.status(200).json({feedDB})
    }
}