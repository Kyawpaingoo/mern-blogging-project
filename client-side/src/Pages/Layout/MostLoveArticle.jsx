import axios from "axios";
import host from '../../Data/Data.js';
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const MostLoveArticle = () => {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        const getFetchData = async()=>{
            await axios.get('get-MostArticle').then(d=>{
                setArticles(d.data);
            })
        }
        getFetchData();
    },[]);
  return (
   <>
        <div className="bg-card p-3 mt-4">
            <h5 className="text-primary"> Most Love Articles</h5>
            <div className="row">
                {
                    articles.map(article=>(   
                        <Link to={`/article/${article._id}`} key={article._id} className="col-6">
                            <div className="bg-dark rounded">
                            <img
                                src={`${host.host}/images/${article.image}`}
                                className="w-100 rounded"
                            />
                            <p className="text-white text-center p-2">{article.title}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
   </>
  )
}

export default MostLoveArticle