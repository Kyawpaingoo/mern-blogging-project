import TagModel from '../Models/TagModel.js';
import LanguageModel from '../Models/LanguageModel.js';

const DataController = {
    getTagLang: async(req, res)=>{
        const tags = await TagModel.find();
        const langs = await LanguageModel.find();

        res.json({tags, langs});
    }
}

export default DataController;