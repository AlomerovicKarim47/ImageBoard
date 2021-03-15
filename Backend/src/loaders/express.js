import {appRouter} from '../routes'
import {urlencoded, json} from 'express'
import cors from 'cors'
import {sendResponse} from '../middleware'

const loadExpress = (app)=>{
    app.use(cors())
    app.use(json())
    app.use(urlencoded({extended:false}))
    app.use(appRouter)
    app.use(sendResponse)
}

export default loadExpress