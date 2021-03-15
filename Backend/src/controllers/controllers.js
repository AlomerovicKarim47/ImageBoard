import {DataAccess} from '../data'

const addPost = async (req, res, next) => {
    try
    {
        let post = req.body.post
        const dataAccess = new DataAccess()
        await dataAccess.addPost(post)
        res.statusCode = 200
    }catch(error){
        res.statusCode = 500
        res.responseMessage = error.message
    }
    next()
}

export {
    addPost
}