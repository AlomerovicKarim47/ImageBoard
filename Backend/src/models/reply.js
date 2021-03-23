import mongoose from 'mongoose'

const replySchema = new mongoose.Schema({
    number: Number,
    text: String,
    likes: Number,
    dislikes: Number,
    replies: [Number],
    board: String
}, {autoCreate:true})
const Reply = mongoose.model("Reply", replySchema)

export default Reply