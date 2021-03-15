import {Router} from 'express'
import {addPost, addReply} from '../controllers'

const appRouter = Router()

appRouter.post('/post', addPost)

appRouter.post('/reply/:parent', addReply)

export default appRouter
