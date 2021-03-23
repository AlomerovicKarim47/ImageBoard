import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema({
    name: String,
    numberOfPosts: Number
}, {autoCreate:true})

const Board = mongoose.model("Board", boardSchema)

export default Board