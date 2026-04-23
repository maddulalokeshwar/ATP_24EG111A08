import exp from 'express'
import {userModel} from '../models/usermodel.js'
import {articleModel} from '../models/articleModel.js'
import { verifyToken} from '../middleware/verifyToken.js'
export const authorApp=exp.Router()
//write aricle
authorApp.post('/article',verifyToken("AUTHOR"),async(req,res)=>{
    //get the article details
    const articleObj=req.body;
    //Check author
    let user=req.user
    let author=await userModel.findById(articleObj.author)
    if(!author)
        return res.status(404).json({message:"Author not found"})
    if(user.email!==author.email)
        return res.status(403).json({message:"You are not authorized"})
    if(author.role!=="AUTHOR")
        return res.status(403).json({message:"Invalid author detail"})
    const articleDoc=new articleModel(articleObj)
    //save
    await articleDoc.save()
    //send res
    res.status(200).json({message:"Article is been published successfully"})
})
//read own article
authorApp.get('/articles',verifyToken("AUTHOR"),async(req,res)=>{
    //get email through decoded token
    const authorid=req.user?.id;
    const articleList=await articleModel.find({author:authorid})
    res.status(200).json({message:"Articles fetched successfully",payload:articleList})
})
//edit article
authorApp.put('/article', verifyToken("AUTHOR"), async (req, res) => {
    const authorid = req.user?.id
    const { articleId, ...updatedData } = req.body
    const articleOfAuthor = await articleModel.findOne({ _id: articleId })
    if (!articleOfAuthor)
        return res.status(404).json({ message: "Article not found" })
    if (articleOfAuthor.author.toString()!== authorid)
        return res.status(403).json({ message: "You cannot edit this article" })

    await articleModel.updateOne({ _id: articleId },{ $set: updatedData })

    res.status(200).json({
        message: "Article updated successfully"
    })
})
//soft-delete the article
authorApp.put('/article',verifyToken("AUTHOR"),async(req,res)=>{
    const articleObj=req.body;
    const article=await articleModel.findOne({_id:articleObj.articleId})
    if(article.isArticleActive===articleObj.isArticleActive)
        return res.status(200).json({message:`The article is already in the state ${articleObj.isArticleActive}`})
    article.isArticleActive = articleObj.isArticleActive
    await article.save()
    res.status(200).json({message:"The state is updated successfully"})

})