export const paginate = async (model, page = 1, limit=5)=>{
    page = parseInt(page);
    limit = parseInt(limit);
    //console.log(limit)

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const modelCount = await model.countDocuments();
    const totalPage = Math.ceil(modelCount/limit);

    const results = {
        count: modelCount,
        totalPage: totalPage,
    };
    
    if(endIndex < modelCount){
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if(startIndex > 0){
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    try{
        results.results = await model.find().limit(limit).skip(startIndex).sort({_id:-1}).exec();
        return results;
    }
    catch(error){
        throw new Error('Error pagination data');
    }
}