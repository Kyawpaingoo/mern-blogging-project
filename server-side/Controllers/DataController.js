import TagModel from '../Models/TagModel.js';
import LanguageModel from '../Models/LanguageModel.js';
import ArticleModel from '../Models/ArticleModel.js';
import { getSpecificData } from '../Helpers/getSpecificData.js';
import { paginateResult } from '../Helpers/paginate.js';

const DataController = {
    getTagLang: async(req, res)=>{
        const tags = await TagModel.find();
        const langs = await LanguageModel.find();
        res.json({tags, langs});
    },

    getHomeArticle: async(req, res)=>{
        const latestArticle = await getSpecificData(ArticleModel, 4, '_id', -1);
        
        res.json(latestArticle);
    },
    getTrendingArticle: async(req, res)=>{
        
        const mostView =  await getSpecificData(ArticleModel, 4, 'view_count', -1);
        
        res.json(mostView);
    },
    getMostArticle: async(req, res)=>{
        const mostLike =  await getSpecificData(ArticleModel, 4, 'like_count', -1);

        res.json(mostLike);
    },

    getAllArticle: async (req, res)=>{
        const {page, title, tag, language} = req.query;
        const limit = 2;
        const sortField = '_id';
        const sortOrder = -1;

        const queryBuilder = [];
        if(title){
            queryBuilder.push({$text: {$search: title}});
        } 
        if(tag){
            queryBuilder.push({"tags._id": tag});
        } 
        if(language){
            queryBuilder.push({"languages._id": language});
        } 
        //console.log(queryBuilder);
        const result = await paginateResult(ArticleModel, page, limit, sortField, sortOrder, queryBuilder);
        res.json(result);
    },

    getArticleDetail: async (req, res)=>{
        const id  = req.params.id;
        const article = await ArticleModel.findById(id);
        res.json(article);
    }
}

export default DataController;