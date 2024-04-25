export const getSpecificData = async (model, limit, sortData, sortVal)=>{
    try{
        const result = await model.find().limit(limit).sort({[sortData]: sortVal});
        return result;
    }
    catch(error){
        throw new Error('Error');
    }
}