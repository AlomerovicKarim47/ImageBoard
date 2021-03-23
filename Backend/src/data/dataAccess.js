import mongoose from 'mongoose'
import {Post, Reply, Board, User} from '../models'

class DataAccess{
    static async addPost(post){
        try
        {
            let board = await Board.findOneAndUpdate({name: post.board}, {$inc:{numberOfPosts:1}}, {useFindAndModify:false})
            let newPost = new Post({...post, number: board.numberOfPosts})
            await newPost.save()
        }catch(error){
            throw error
        }
    }

    static async addReply(reply, parent){
        try {
            let board = await Board.findOneAndUpdate({name: reply.board}, {$inc:{numberOfPosts:1}}, {useFindAndModify:false}) //todo
            let newReply = new Reply({...reply, number: board.numberOfPosts})
            await newReply.save()
            await Post.findOneAndUpdate({number: parent, board: reply.board}, {$push:{replies: newReply.number}}, {useFindAndModify: false})
            await Reply.findOneAndUpdate({number: parent}, {$push:{replies: newReply.number}}, {useFindAndModify: false})
        } catch (error) {
            throw error
        }
    }

    static async getPosts(board){
        try {
            let res = await Post.find({board})
            return res
        } catch (error) {
            throw error
        }
    }

    static async searchUsersByUsername(username, exact){
        try {
            let res = await User.find({username:exact?username:`/.*${username}.*/`})
            return res
        } catch (error) {
            throw error
        }
    }

    static async searchUsersByEmail(email){
        try {
            let res = await User.find({email})
            return res
        } catch (error) {
            throw error
        }
    }

    static async addUser(user){
        try {
            let newUser = new User(user)          
            await newUser.save()
        } catch (error) {
            throw error
        }
    }

    static async updatePostOrReply(number, newData){
        try {
            await Post.findOneAndUpdate({number}, newData, {useFindAndModify:false})
            await Reply.findOneAndUpdate({number}, newData, {useFindAndModify:false})
        } catch (error) {
            throw error
        }
    }

    static async deletePostOrReply(number){
        try {
            let post = await Post.findOne({number})
            if (!post)
                post = await Reply.findOne({number})
            await Post.deleteOne({number})
            let replyDeletion = await Reply.deleteOne({number})
            if (replyDeletion.deletedCount == 1)
            {
                await Post.updateOne({replies:number}, {$pull:{replies:number}})
                await Reply.updateOne({replies:number}, {$pull:{replies:number}})
            }
            let replies = post.replies
            while (replies.length > 0){
                let newReplies = []
                for (var i = 0; i < replies.length; i++){
                    let reply = await Reply.findOne({number: replies[i]})
                    for (var j = 0; j < reply.replies.length; j++)
                        newReplies.push(reply.replies[j])
                }
                await Reply.deleteMany({number:{$in:replies}})
                replies = newReplies
            }
        } catch (error) {
            throw error
        }
    }

    static async getBoards(username){
        try {
            let res = null
            if (username){
                res = await User.findOne({username}, {boards:1})
                res = res.boards
            }
            else{
                res = await Board.find({}, {name:1})
                res = res.map(b => b.name)
            }
            return res
        } catch (error) {
            throw error
        }    
    }

    static async addBoard(name){
        try {
            let ins = await Board.findOneAndUpdate({name}, {$setOnInsert:{name: name, numberOfPosts:0}}, {upsert:true, useFindAndModify:false})
            return !ins
        } catch (error) {
            throw error
        }
    }

    static async joinBoard(username, board){
        try {
            let boardExists = await Board.findOne({name: board})
            if (!boardExists)
                return false
            let joined = await User.findOne({username, boards: board})
            await User.updateOne({username}, joined?{$pull:{boards : board}}:{$push:{boards: board}})
        } catch (error) {
            throw error
        }
        return true
    }

    static async getReplies(number){
        try {
            let post = await Post.findOne({number})
            if (!post)
                post = await Reply.findOne({number})
            let res = await Reply.find({number:{$in: post.replies}})
            return res
        } catch (error) {
            throw error
        }
    }
}

module.exports = DataAccess