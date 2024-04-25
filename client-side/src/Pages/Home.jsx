import { useEffect, useState } from 'react'
import Master from './Layout/Master'
import axios from 'axios';
import host from '../Data/Data.js';
import { Link } from 'react-router-dom';

const Home = () => {
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
            const getFetchData =  async()=>{
                await axios.get('get-HomeArticle').then(d=>{
                    setArticles(d.data);
                });
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
                <div className="d-flex rounded bg-card">
                <img
                        style={{ width: 400 }}
                        src="https://toka.b-cdn.net/wp-content/uploads/2022/01/black-man-looking-stock-market-exchange-information-computer-crypto-currency.png"
                        className="rounded"
                />
                <div className="p-3">
                    <b className="text-warning">Fullstack</b>
                    <h3 className="text-white">What is MERN Fullstack App?</h3>
                    <p>
                        MERN Stackဆိုတာဘာလည်း ဘယ်လိုအလုပ်လုပ်တာလည်းအပြင် သူ့ကိုလေ့လာဖို့
                        road map ပါ တစ်ခါတည်းရှင်းပြပေးသွားမှာဖြစ်ပါတယ်။ MERN
                        Stackဆိုတာဘာလည်း ဘယ်လိုအလုပ်လုပ်တာလည်းအပြင် သူ့ကိုလေ့လာဖို့ road
                        map ပါ တစ်ခါတည်းရှင်းပြပေးသွားမှာဖြစ်ပါတယ်။ MERN Stackဆိုတာဘာလည်း
                        ဘယ်လိုအလုပ်လုပ်တာလည်းအပြင် သူ့ကိုလေ့လာဖို့ road map ပါ
                        တစ်ခါတည်းရှင်းပြပေးသွားမှာဖြစ်ပါတယ်။
                    </p>
                    <div className="d-flex justify-content-between">
                        <div>
                            <a href="" className="text-muted">
                            <i className="bx bx-user" />
                            <small>Aung Aung</small>
                            </a>
                        </div>
                        <div>
                            <a href="" className="text-muted">
                            <i className="bx bx-happy-heart-eyes" />
                            <small>6785</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-4 blog-list">
            <div className="row p-0 m-0">
                {
                    articles.map((article)=>(
                        <Link to={`/article/${article._id}`} key={article._id} className="col-6  pl-0 mt-4">
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