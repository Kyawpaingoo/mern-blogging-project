import mongoose from 'mongoose';

const LanguageSchema = new mongoose.Schema({
    'slug':{
        type: String,
        required: true
    },
    'name':{
        type: String,
        required: true
    },
})

export default mongoose.model('Languages', LanguageSchema); 