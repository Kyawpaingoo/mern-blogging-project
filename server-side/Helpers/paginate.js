export const paginateResult = async (model, page = 1, limit=5, sortDir='_id', sortVal=-1, conditions=[])=>{
  
    try{
        let query = {};
        
        // If conditions are provided, use $and operator
        if (conditions.length > 0) {
            query.$and = conditions;
        }
        
        const results = await model.paginate(query,{
            page: page,
            limit: limit,
            sort: {[sortDir]: sortVal}
        })
        
        return results;
    }
    catch(error){
        throw new Error('Error pagination data');
    }
}