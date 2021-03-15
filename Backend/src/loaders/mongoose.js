import mongoose, { Schema } from 'mongoose'
import config from '../config'

const loadMongoose = async()=>{

    mongoose.connect(config.DB_CONNECTION_STRING, {
        useNewUrlParser:true, 
        useUnifiedTopology:true,
        autoCreate:true
    })
}

export default loadMongoose