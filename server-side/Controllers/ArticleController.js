import TagModel from '../Models/TagModel.js';
import LanguageModel from '../Models/LanguageModel.js';
import ArticleModel from '../Models/ArticleModel.js';
import slug from 'slug';
import { paginate } from '../Helpers/paginate.js';

export const getTagLanguage = async (req, res)=>{
    const tagData = await TagModel.find();
    const languageData = await LanguageModel.find();

    const tag = [];
    const language = [];

    tagData.map((d)=>{
        tag.push({value: d.slug, label: d.name});
    });

    languageData.map((d)=>{
        language.push({value: d.slug, label: d.name});
    });

    res.json({language, tag});
}

export const all = async (req, res)=>{
   const {page} = req.query;
   const limit = 5;
   const result = await paginate(ArticleModel, page, limit);
   res.json(result);
}

export const store = async (req, res)=>{
    const {files, body} = req;
    //onsole.log(body);
    
    const fileName = files.image.name;
    const filePath = 'public/images/' + fileName;
    files.image.mv(filePath, (err)=>{
        console.log(err)
    })
   // console.log(filePath);
    const reqTags = JSON.parse(body.tags);
    const tagQuery = [];

    reqTags.map((t)=>{
        tagQuery.push({slug: t.value});
    })

    const dataTags = await TagModel.find({
        $or: tagQuery,
    })

    const reqLanguagess = JSON.parse(body.languages);
    const languageQuery = [];

    reqLanguagess.map((l)=>{
        languageQuery.push({slug: l.value});
    })

    const dataLanguage = await LanguageModel.find({
        $or: languageQuery,
    })

    const data = await ArticleModel.create({
        slug: slug(body.title),
        image: fileName,
        title: body.title,
        description: body.description,
        tags: dataTags,
        languages: dataLanguage
    })

    console.log(data);

    res.json('Article Created');
}

export const edit = async (req, res)=>{
   const article = await ArticleModel.find({_id:req.params.id});
   res.json(article);
}

export const update = async (req, res)=>{
    const { files, body, params } = req;

  const dbData = await ArticleModel.findOne({ _id: params.id });

  if (files) {
    //image upload
    var fileName = files.image.name;
    const filePath = "public/images/" + fileName;
    files.image.mv(filePath, (err) => {
      console.log(err);
    });
  } else {
    fileName = dbData.image;
  }

  //prepare for tags
  const reqTags = JSON.parse(body.tags);
  const tagQuery = [];
  reqTags.map((t) => {
    tagQuery.push({ slug: t.value });
  });
  const dataTags = await TagModel.find({
    $or: tagQuery,
  });

  //prepare for category
  const reqLanguages = JSON.parse(body.languages);
  const languageQuery = [];
  reqLanguages.map((l) => {
    languageQuery.push({ slug: l.value });
  });
  const dataLanguage = await LanguageModel.find({
    $or: languageQuery,
  });

  await ArticleModel.findByIdAndUpdate(params.id, {
    slug: slug(body.title),
    title: body.title,
    description: body.description,
    tags: dataTags,
    languages: dataLanguage,
    image: fileName,
  });
  console.log(fileName)
  res.json(fileName);
}

export const destroy = (req, res)=>{
    res.json('destroy request');
}