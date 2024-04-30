import Master from './Layout/Master.jsx'
import host from '../Data/Data.js'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import PageLoader from '../Components/PageLoader.jsx';

const ArticleDetail = () => {
    const [loader ,setLoader] = useState(true);
    const [article, setArticle] = useState({});
    const params = useParams();
    useEffect(()=>{
        const getData = async()=>{
            await axios.get('/articles/'+params.id).then((d)=>{
                setLoader(false);
                setArticle(d.data);
            })
        }
        getData();
    },[params.id])
  return (
    <Master>
        {
            loader ? (<PageLoader />) : (
                article ? (
                    <div className='mx-2'>
                        <img src={`${host.host}/images/${article.image}`} className="w-100" alt="" />
                        <h3 className="text-white mt-2">{article.title}</h3>
                        <div className="card p-2 bg-dark">
                            <div className="row">
                                <div className="col-6">
                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex'>
                                            <div className='mr-2'>Tags:</div> 
                                            <div className='d-flex'>
                                                {
                                                article.tags.map(d=>(
                                                    <span key={d._id} className='badge badge-danger mr-2'>{d.name}</span>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className='d-flex'>
                                            <div className='mr-2'>Languages:</div> 
                                            <div className='d-flex'>
                                                {
                                                    article.languages.map(d=>(
                                                        <span key={d._id} className='badge badge-primary mr-2'>{d.name}</span>
                                                    ))
                                                }
                                            </div>
                                        </div>   
                                    </div>
                                </div>
                                <div className="col-6 d-flex justify-content-end">
                                    <span>User Name: {article.author}</span>
                                </div>
                            </div> 
                        </div>

                        <div className="text-white my-3" 
                            dangerouslySetInnerHTML={{ __html: article.description}}>
                        </div>

                        <div className='row my-3 mx-2'>
                            <div className='mr-2'>
                                <button className="btn btn-primary">
                                    Like: {article.like_count}
                                </button>
                            </div>
                            <div className='mr-2'>
                                <button className="btn btn-primary">
                                    View: {article.view_count}
                                </button>
                            </div>
                            <div className='mr-2'>
                                <button className="btn btn-primary">
                                    Comment: {article.comment_count}
                                </button>
                            </div>
                        </div>
                        <div className="row mx-2">
                            <textarea className='form-control'>Enter Comment</textarea>
                            <button className='btn btn-primary my-2'>Write Comment</button>
                        </div>

                        <div className="mx-2 my-2 mx-2">
                            <h4 className='text-white'>Comments</h4>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <div>
                                        <b>User Two</b>
                                        <small className='text-muted ml-2'>Date</small>
                                    </div>
                                    <div className='mt-2'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui adipisci atque explicabo optio id incidunt quos cumque molestias debitis porro? Quisquam, eveniet! Expedita similique voluptates id laborum facere a optio!
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div>
                        <span>No Data Found.</span>
                    </div>
                )
            )
        }
    </Master>
  )
}

export default ArticleDetail