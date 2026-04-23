import {Schema,model,Types} from 'mongoose';

const commentSchema=new Schema({
    user:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,'user id is required']
    },
    comment:{
        type:String,
        required:[true,"Please enter a comment"]
    }
},{
    versionKey:false,
    timestamps:true,
    strict:'throw'
})
const articleSchema=new Schema({
    author:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,'Author id is required']
    },
    title:{
        type:String,
        required:[true,'Title name is required']
    },
    category:{
        type:String,
        required:[true,"Category is required"]
        
    },
    content:{
        type:String,
        required:[true,"Content is required"]
    },
    comments:[{type:commentSchema,default:[]}],
    isArticleActive:{
        type:Boolean,
        default:true
    }


})
export const articleModel=model('article',articleSchema)