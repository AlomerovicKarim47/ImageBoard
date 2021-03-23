import {Router} from 'express'
import {addBoard, addPost, addReply, deletePostOrReply, getBoards, getPosts, getReplies, joinBoard, login, register, updatePostOrReply} from '../controllers'

const appRouter = Router()

appRouter.post('/post', addPost)

appRouter.post('/reply/:parent', addReply)

appRouter.get('/posts/:board', getPosts)

appRouter.post('/register', register)

appRouter.post('/login', login)

appRouter.put('/update/:number', updatePostOrReply)

appRouter.delete('/delete/:number', deletePostOrReply)

appRouter.get('/boards', getBoards)

appRouter.get('/replies/:post', getReplies)

appRouter.post('/board', addBoard)

appRouter.post('/join/:board/:user', joinBoard)

export default appRouter
