import {Router} from 'express'
import {addPost} from '../controllers'

const appRouter = Router()

appRouter.post('/post', addPost)

export default appRouter
