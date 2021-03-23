import mongoose, { Schema } from 'mongoose'
import config from '../config'
import {Board} from '../models'

const loadMongoose = async()=>{

    mongoose.connect(config.DB_CONNECTION_STRING, {
        useNewUrlParser:true, 
        useUnifiedTopology:true,
        autoCreate:true
    })

    await Board.findOneAndUpdate({name:'creative'}, {$setOnInsert:{name:'creative', numberOfPosts:0}}, {upsert: true, useFindAndModify:false})
}

export default loadMongoose