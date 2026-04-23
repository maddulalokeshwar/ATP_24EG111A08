import exp from 'express'
import {articleModel} from '../models/articleModel.js'
import {verifyToken} from '../middleware/verifyToken.js'
export const userApp=exp.Router()

//View article of all authors
userApp.get('/articles', verifyToken("USER"), async (req, res) => {
    const articlesList = await articleModel
      .find({ isArticleActive: true })
      .populate("comments.user", "FirstName LastName");
    res.status(200).json({
      message: "Articles fetched successfully",
      payload: articlesList
    });
});
//Write comments
userApp.put('/articles', verifyToken("USER"), async (req, res) => {

    const { articleId, comment } = req.body;

    const articleDocument = await articleModel.findOne({
      _id: articleId,
      isArticleActive: true
    });

    if (!articleDocument)
      return res.status(404).json({ message: "Article not found" });

    const userId = req.user?.id;

    articleDocument.comments.push({
      user: userId,
      comment
    });

    await articleDocument.save();

    // 🔥 IMPORTANT: return populated version
    const updatedArticle = await articleModel
      .findById(articleId)
      .populate("comments.user", "FirstName LastName");

    res.status(200).json({
      message: "Comment added successfully",
      payload: updatedArticle
    });
});
