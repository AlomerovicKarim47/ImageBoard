import {DataAccess} from '../data'
import jwt from 'jsonwebtoken'
import config from '../config'

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

const getPosts = async (req, res, next) => {
    try {
        let board = req.params.board
        let rez = await DataAccess.getPosts(board)
        res.statusCode = 200
        res.responseData = JSON.stringify(rez)
    } catch (error) {
        res.statusCode = 500
        res.responseMessage = error.message
    }
    next()
}

const register = async (req, res, next) => {
    try {
        let newUser = req.body.user
        let usernames = await DataAccess.searchUsersByUsername(newUser.username, true)
        let emails = await DataAccess.searchUsersByEmail(newUser.email)
        if (usernames.length > 0 || emails.length > 0){
            res.statusCode = 409
            res.responseData = {
                error:{username: usernames.length>0?1:0, email: emails.length>0?1:0}
            }
            res.responseMessage = `Registration failed because username and/or email already exist (check data.error for more information).`
            next()
            return
        }
        await DataAccess.addUser(newUser)
        res.statusCode = 201
    } catch (error) {
        res.statusCode = 500
        res.responseMessage = error.message
    }
    next()
}

const login = async (req, res, next) => {
    try {
        let username = req.body.username
        let password = req.body.password
        let users = await DataAccess.searchUsersByUsername(username, true)
        let user = users.length>0?users[0].toObject():null
        if (!user || user.password != password){
            res.statusCode = 401
            res.responseMessage = "Unauthorized. Username or password not valid."
            next()
            return
        }
        delete user.password
        jwt.sign({user}, config.JWT_SECRET_KEY, (err, token) => {
            res.responseData = {
                token,
                user
            }
            next()
        })
    } catch (error) {
        res.statusCode = 500
        res.responseMessage = error.message
    }
    //next()
}

const updatePostOrReply = async (req, res, next) => {
    try {
        let number = req.params.number
        let newData = req.body.newData
        await DataAccess.updatePostOrReply(number, newData)
    } catch (error) {
        res.statusCode = 500
        res.responseMessage = error.message
    }
    next()
}

const deletePostOrReply = async (req, res, next) => {
    try {
        let number = req.params.number
        await DataAccess.deletePostOrReply(number)
    } catch (error) {
        res.statusCode = 500
        res.responseMessage = error.message
    }
    next()
}

const getBoards = async (req, res, next) => {
    try {
        let username = req.query.user
        let rez = await DataAccess.getBoards(username)
        res.responseData = JSON.stringify(rez)
    } catch (error) {
        res.statusCode = 500
        res.responseMessage = error.message
    }
    next()
}

const addBoard = async(req, res, next) => {
    try {
        let name = req.body.name
        let created = await DataAccess.addBoard(name)
        if (!created){
            res.statusCode = 409
            res.responseMessage = "A board with that name already exists."
        }
    } catch (error) {
        res.statusCode = 500
        res.responseMessage = error.message
    }
    next()
}

const joinBoard = async(req, res, next) => {
    try {
        let board = req.params.board
        let username = req.params.user
        let success = await DataAccess.joinBoard(username, board)
        if (!success){
            res.statusCode = 404
            res.responseMessage = `The board with the name ${board} doesn't exist.`
        }
    } catch (error) {
        res.statusCode = 500
        res.responseMessage = error.message
    }
    next()
}

const getReplies = async (req, res, next) => {
    try {
        let post = req.params.post
        let rez = await DataAccess.getReplies(post)
        res.responseData = JSON.stringify(rez)
    } catch (error) {
        res.statusCode = 500
        res.responseMessage = error.message
    }
    next()
}

export {
    addPost,
    addReply,
    getPosts,
    register,
    login,
    updatePostOrReply,
    deletePostOrReply,
    getBoards,
    getReplies,
    addBoard,
    joinBoard
}