import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
    'slug':{
        type: String,
        required: true
    },
    'name':{
        type: String,
        required: true
    },
})

export default mongoose.model('Tags', TagSchema); 