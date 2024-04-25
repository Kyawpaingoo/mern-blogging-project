import TagModel from '../Models/TagModel.js';
import LanguageModel from '../Models/LanguageModel.js';
import ArticleModel from '../Models/ArticleModel.js';
import { getSpecificData } from '../Helpers/getSpecificData.js';

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
    }
}

export default DataController;