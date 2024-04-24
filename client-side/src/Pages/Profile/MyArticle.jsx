import { useEffect, useState } from "react";
import axios from 'axios';
import ButtonLoader from "../../Components/ButtonLoader.";
import { Link } from "react-router-dom"
import PageLoader from "../../Components/PageLoader";

const MyArticle = () => {
    const [page, setPage] = useState(1);
    const [article, setArticle] = useState([]);
    const [loader, setLoader] = useState(true);
    const [totalPage, setTotalPage] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        setLoader(true);
        const fetchArticleData = async()=>{
            await axios.get('/auth/article?page='+page).then((d)=>{
                setLoader(false);
                setArticle(d.data.results);
                setTotalPage(d.data.totalPage);
                setCount(d.data.count);
            })
        }
        fetchArticleData();
    },[page]);
  return (
    <div className="row mt-3">
        {
            article.length <= count ? (
                loader ? (
                    <PageLoader />
                ) : (
                    article.map((arr)=>(
                        (
                            <div key={arr._id}  className="col-12">
                                <div className="card bg-dark d-flex flex-row mt-3">
                                    <img src={"http://localhost:4444/images/"+arr.image} className="w-50" />
                                    <div className="ml-2 pt-3">
                                        <h3 className="text-white">{arr.title}</h3>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex align-items-center mr-3">
                                                <b className="mr-2">Like: </b>
                                                <span className="text-danger">{arr.like_count}</span>
                                            </div>
                                            <div className="d-flex align-items-center mr-3">
                                                <b className="mr-2">Comment: </b>
                                                <span className="text-danger">{arr.comment_count}</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <b className="mr-2">View: </b>
                                                <span className="text-danger">{arr.view_count}</span>
                                            </div>
                                        </div>
                                        <div className="col-12 my-4">
                                            <Link to="" className="btn btn-secondary mt-5">
                                                View
                                            </Link>
                                            <Link to={`/article/edit/${arr._id}`} className="btn btn-secondary mt-5">
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                )          
            ) : (
                <div className="col-12">
                    <p>No Post Found.</p>
                </div>
            )
        }

        <div className="col-12 mt-3">
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" 
                        onClick={()=>setPage(page-1)} disabled={page <= 1}
                >
                    Previous
                </button>
                <button className="btn btn-primary" 
                        onClick={()=>setPage(page+1)} disabled={page >= totalPage}
                >
                    Next
                </button>
            </div>
        </div>
    </div>
  )
}  

export default MyArticle