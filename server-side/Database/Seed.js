import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TagModel from '../Models/TagModel.js';
import LanguageModel from '../Models/LanguageModel.js';
import slug from 'slug';

dotenv.config();
const mongourl = process.env.MONGO_URL;
mongoose.connect(mongourl).then(d=>{
    console.log('database connected');
});

const tags = ['Web Development', 'Design', 'UI/UX', 'Software Development', 'Computer Science'];
const languages = ['PHP', 'NodeJS', 'Laravel', 'ReactJS', 'C# ASP.NET Core', 'Flutter', 'Dart'];

(async()=>{
    tags.map(async(d)=>{
        await TagModel.create({
            slug: slug(d),
            name:d,
        });
    });

    languages.map(async(d)=>{
        await LanguageModel.create({
            slug: slug(d),
            name:d,
        });
    });

    console.log('seeding success');
})();