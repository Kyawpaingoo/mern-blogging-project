import Master from './Layout/Master.jsx'
import host from '../Data/Data.js'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import PageLoader from '../Components/PageLoader.jsx';
import ButtonLoader from '../Components/ButtonLoader..jsx'
import {toast} from 'react-toastify'
import moment from 'moment'
import AuthContext from '../Context/AuthContext.jsx';
const ArticleDetail = () => {
    const {authUser} = useContext(AuthContext);
    const [loader ,setLoader] = useState(true);
    const [article, setArticle] = useState({});
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [commentLoader, setCommentLoader] = useState(false);
    const [liked, setLiked] = useState(false);
    
    const params = useParams();
    useEffect(()=>{
        const getData = async()=>{
            await axios.get('/articles/'+params.id).then((d)=>{
                setLoader(false);
                setArticle(d.data.article);
                setCommentList(d.data.comment);
            })
        }
        getData();
    },[params.id]);

    const storeComment = async ()=>{
        setCommentLoader(true);
        await axios.post('/article/comment', {comment, article_id: article._id}).then((d)=>{
            setCommentLoader(false);
           if(d.data == 'not_auth'){
            toast.error('Please Login First!');
            return;
           }
           else{
            const createdComment = {
                ...d.data,
                user:{
                    name: authUser.name
                }
            }
            setCommentList([createdComment, ...commentList]);
            setComment('');
            toast.success('Comment Created!');
           }
        })
    }

    const like = async ()=>{
        if(!liked){
            await axios.post('/articles/like',{article_id: article._id}).then((d)=>{
            
                if(d.data=='success'){
                    setArticle({...article, like_count: article.like_count + 1});
                }
            })
        }
        else{
            await axios.post('/articles/unlike',{article_id: article._id}).then((d)=>{
            
                if(d.data=='success'){
                    setArticle({...article, like_count: article.like_count - 1});
                }
            })
        }
        
        setLiked(!liked);
    }
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
                                    <span className='text-white'>Author: {article.author}</span>
                                </div>
                            </div> 
                        </div>

                        <div className="text-white my-3" 
                            dangerouslySetInnerHTML={{ __html: article.description}}>
                        </div>

                        <div className='row my-3 mx-2'>
                            <div className='mr-2'>
                                <a onClick={like} className="like-container">
                                    {
                                        <i className={`${liked ? 'fa-solid' : 'fa-regular'}  fa-heart text-white`} id="heart-icon"></i>
                                        
                                    }
                                    <span className="text-white mx-2">
                                        Like: {article.like_count}          
                                    </span>
                                </a>
                            </div>
                            <div className='mr-2'>
                                
                                <i className="fa-regular fa-eye text-white"></i>
                                <span className="text-white mx-2">
                                    View: {article.view_count}
                                </span>
                            </div>
                            <div className='mr-2'>
                            <i className="fa-regular fa-message text-white"></i>
                                <span className="text-white mx-2">
                                    Comment: {article.comment_count}
                                </span>
                            </div>
                        </div>
                        <div className="row mx-2">
                            <textarea value={comment}
                                onChange={(e)=>setComment(e.target.value)} 
                                className='form-control'>Enter Comment</textarea>
                            <button disabled={commentLoader} onClick={storeComment}
                                className='btn btn-primary my-2'>
                                    {
                                        commentLoader ?? 
                                        <ButtonLoader />
                                    }
                                   
                                    Write Comment
                                </button>
                        </div>

                        <div className="mx-2 my-2 mx-2">
                            <h4 className='text-white'>Comments</h4>
                            <ul className="list-group">
                                {
                                    commentList.length > 0 ? 
                                    commentList.map((d)=>(
                                        <li key={d._id} className="list-group-item">
                                            <div>
                                                <b>{d.user.name}</b>
                                                <small className='text-muted ml-2'>{moment(d.createdAt).fromNow()}</small>
                                            </div>
                                            <div className='mt-2'>
                                                {d.comment}
                                            </div>
                                        </li>
                                    )) : (
                                        <span>
                                            No Comment Here.
                                        </span>
                                    )
                                }
                                
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