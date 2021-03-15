import mongoose from 'mongoose'
import {Post, Reply} from '../models'

class DataAccess{
    async addPost(post){
        try
        {
            let newPost = new Post(post)
            await newPost.save()
        }catch(error){
            throw error
        }
    }
}

module.exports = DataAccess