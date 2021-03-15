import mongoose from 'mongoose'
import {Post, Reply} from '../models'

class DataAccess{
    static async addPost(post){
        try
        {
            let newPost = new Post(post)
            await newPost.save()
        }catch(error){
            throw error
        }
    }

    static async addReply(reply, parent){
        try {
            let newReply = new Reply(reply)
            await newReply.save()
            let res = await Post.findOneAndUpdate({_id: new mongoose.Types.ObjectId(parent)}, {$push:{replies: newReply._id}}, {useFindAndModify: false})
            if (!res)
                await Reply.findOneAndUpdate({_id: new mongoose.Types.ObjectId(parent)}, {$push:{replies: newReply._id}}, {useFindAndModify: false})
        } catch (error) {
            throw error
        }
    }
}

module.exports = DataAccess