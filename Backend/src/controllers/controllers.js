import {DataAccess} from '../data'

const addPost = async (req, res, next) => {
    try
    {
        let post = req.body.post
        await DataAccess.addPost(post)
        res.statusCode = 201
    }catch(error){
        res.statusCode = 500
        res.responseMessage = error.message
    }
    next()
}

const addReply = async (req, res, next) => {
    try {
        let parent = req.params.parent
        let reply = req.body.reply
        await DataAccess.addReply(reply, parent)
        res.statusCode = 201
    } catch (error) {
        res.statusCode = 500
        res.responseMessage = error.message
    }
    next()
}

export {
    addPost,
    addReply
}