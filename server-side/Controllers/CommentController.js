import ArticleCommentModel from '../Models/ArticleCommentModel.js'
import ArticleModel from '../Models/ArticleModel.js'

export const store = async(req, res)=>{
    const {_id} = req.AuthUser;
    const {article_id, comment} = req.body;
    const data = await ArticleCommentModel.create({
        user: _id,
        article: article_id,
        comment,
    });
    await ArticleModel.findByIdAndUpdate(article_id,{
        $inc: {comment_count: 1}
    });

    res.json(data);
}