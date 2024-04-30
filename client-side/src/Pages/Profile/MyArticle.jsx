import { useContext } from "react";
import AuthContext from "../../Context/AuthContext.jsx"
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom"
import PageLoader from "../../Components/PageLoader.jsx";
import Paginate from "../../Components/Paginate.jsx";

const MyArticle = () => {
    const {authUser, setAuthUser} = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [article, setArticle] = useState([]);
    const [loader, setLoader] = useState(true);
    const [totalPage, setTotalPage] = useState(null);
    const [count, setCount] = useState(0);
    useEffect(()=>{
        setLoader(true);
        const fetchArticleData = async()=>{
            await axios.get(`/auth/article/${authUser.name}?page=${page}`).then((d)=>{
                setLoader(false);
                setArticle(d.data.docs);
                setTotalPage(d.data.totalPages);
                setCount(d.data.count);
            })
        }
        fetchArticleData();
    },[authUser.name, page]);
  return (
    <div className="row mt-3">
        {
            article.length > 0 ? (
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
                                            <div className="d-flex align-items-center">
                                                <b className="mr-2">Author: </b>
                                                <span className="text-light">{arr.author}</span>
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

        <Paginate page={page} totalPage={totalPage} setPage={setPage} />
    </div>
  )
}  

export default MyArticle