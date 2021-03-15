import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({
    number: Number,
    title: String,
    text: String,
    image: String,
    likes: Number,
    dislikes: Number,
    replies: Array,
    board: String
})
const Post = mongoose.model("Post", postSchema)
export default Post