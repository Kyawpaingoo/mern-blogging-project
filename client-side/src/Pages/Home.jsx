import { useEffect, useState } from 'react'
import Master from './Layout/Master'
import axios from 'axios';
import host from '../Data/Data.js';
import { Link } from 'react-router-dom';
import data from '../Data/Data.js';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [commentArticle, setCommentArticle] = useState({});
    const [tag, setTag] = useState([]);
    useEffect(()=>{
            const getFetchData =  async()=>{
                const latestArticles = await axios.get('get-HomeArticle');
                const mostCommentArticle = await axios.get('get-MostCommentArticle');

                Promise.all([latestArticles, mostCommentArticle]).then((res)=>{
                    const latestData = res[0].data;
                    const commentData = res[1].data[0];
                    setArticles(latestData);
                    setCommentArticle(commentData);
                    setTag(commentData.tags);
                    //console.log(commentArticle);
                })
            }
        getFetchData();
    },[]);
    
  return (
    <Master>
        <div className="mt-4">
            <input
                placeholder="Search Blog..."
                type="text"
                className="form-control rounded bg-card"
                />
        </div>
        {/* first blog */}
        <div className="mt-4">
                <Link to={`/articles/${commentArticle._id}`} className="d-flex rounded bg-card">
                <img
                        style={{ width: 400 }}
                        src={`${data.host}/images/${commentArticle.image}`}
                        className="rounded"
                />
                <div className="p-3">
                    {
                       tag.map((d, index) => (
                        <span className='text-white' key={d._id}>
                            {d.name}
                             {index < commentArticle.tags.length - 1 && ', '}
                        </span>
                       ))
                    }
                    <h2 className="text-white">{commentArticle.title}</h2>
                   {/* <div
                   dangerouslySetInnerHTML={{__html: commentArticle.description}}></div> */}
                    <div className="d-flex justify-content-between">
                        <div>
                            <div>
                                <a className="text-muted">
                                    <span className='fs-2'> 
                                        <i className="fa-regular fa-user"></i> {commentArticle.view_count}
                                    </span>
                                </a>
                            </div>
                            <div className='py-2'>
                                <a className="text-muted">
                                    <span className='fs-2'>
                                        <i className="fa-regular fa-thumbs-up"></i> {commentArticle.like_count}
                                    </span>
                                </a>
                            </div>

                            <div className='py-2'>
                            <a className="text-muted">
                                <span className='fs-2'> 
                                    <i className="fa-regular fa-message"></i> {commentArticle.comment_count}
                                    
                                </span>
                            </a>
                        </div>
                        </div>
                       
                        <div>
                            <a className="text-muted">
                                <span className='fs-2'> 
                                    Author: {commentArticle.author}
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        <div className="mt-4 blog-list">
            <div className="row p-0 m-0">
                {
                    articles.map((article)=>(
                        <Link to={`/articles/${article._id}`} key={article._id} className="col-6  pl-0 mt-4">
                            <div className="rounded bg-card">
                                <img
                                    className="rounded"
                                    src={`${host.host}/images/${article.image}`}
                                    style={{ width: "100%" }}
                                    alt=""
                                />
                                <div className="p-4 text-white">
                                    <h4 className="text-white">{article.title}</h4>
                                    <div className="d-flex justify-content-between">
                                    <button className="btn btn-dark">
                                        <span className="text-success">
                                        <i className="bx bx-happy-heart-eyes" />
                                        </span>{" "}
                                        : {article.view_count}
                                    </button>
                                    <button className="btn btn-dark">
                                        <span className="text-success">
                                        <i className="bx bx-heart" />
                                        </span>{" "}
                                        : {article.like_count}
                                    </button>
                                    <button className="btn btn-dark">
                                        <span className="text-success">
                                        <i className="bx bx-message-square-dots" />
                                        </span>{" "}
                                        : {article.comment_count}
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                )
                }
            </div>
        </div>
    </Master>
  )
}

export default Home