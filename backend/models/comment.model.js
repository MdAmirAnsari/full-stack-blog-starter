import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    username: {
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    img: {
        type:String,
    },
    savedPosts:{
        type:[String],
        default:[],
    },   
},{timestamps:true}
)

export default mongoose.model("Comment",commentSchema);