import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Master from "./Layout/Master"
import { useEffect, useState } from "react"
import axios from "axios";
import host from '../Data/Data.js';
import PageLoader from "../Components/PageLoader.jsx";
import Paginate from "../Components/Paginate.jsx";

const AllArticle = () => {
    const [loader, setLoader] = useState(true);
    const [page, setPage] = useState(1);
    const [tags, setTags] = useState([]);
    const [langs, setLangs] = useState([]);
    const [article, setArticle] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const[selectedTag, setSelectedTag] = useState('');
    const[selectedLang, setSelectedLang] = useState('');
    const [totalPages, setTotalPages] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const titleQuery = searchParams.get('title') ?? ''; 
    const tagQuery = searchParams.get('tag') ?? ''; 
    const languageQuery = searchParams.get('language') ?? ''; 

    const queryStringUrl = `?title=${titleQuery}&tag=${tagQuery}&language=${languageQuery}`;

    useEffect(()=>{
        getData();
    },[queryStringUrl, page]);

    const getData = async()=> {
        setLoader(true);
        const tagLangRequest = await axios.get('/get-taglangs');
        // const articleRequest = await axios.get('/articles'+queryStringUrl+`${page}`);
         const articleRequest = await axios.get('/articles'+queryStringUrl+`&page=${page}`);

        Promise.all([tagLangRequest, articleRequest]).then((res)=>{
            setLoader(false);
            const tagLangData = res[0].data;
            const articleData = res[1].data;
            const totalPage = res[1].data.totalPages;
            setTags(tagLangData.tags);
            setLangs(tagLangData.langs);
            setArticle(articleData.docs);
            setTotalPages(totalPage);
        })
    }

    const renderSearch = ()=>{
        setPage(1);
        navigate(`/articles?title=${searchTitle}&tag=${selectedTag}&language=${selectedLang}`);
    }
  return (
    <Master>
        <div className="row mt-4">
            <div className="col-4">
                <input
                defaultValue={searchTitle}
                onChange={e=>setSearchTitle(e.target.value)}
                    placeholder="Search Blog..."
                    type="text"
                    className="form-control rounded bg-card"
                    />
            </div>
            <div className="col-8">
                <div className="d-flex justify-content-between">
                    <div className="col-5">
                        <select defaultValue={selectedTag}
                            onChange={e=>setSelectedTag(e.target.value)} className="btn btn-secondary">
                            <option value="">Tags</option>
                            {tags.map((d)=> (
                                <option key={d._id} value={d._id}> {d.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-4">
                        <select defaultValue={selectedLang} 
                            onChange={e=>setSelectedLang(e.target.value)} className="btn btn-secondary">
                            <option value="">Languages</option>
                            {langs.map((d)=> (
                                <option key={d._id} value={d._id}> {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-2">
                        <button onClick={renderSearch} className="btn btn-danger">Search</button>
                    </div>
                </div>
            </div>
            
        </div>
        <div className="mt-4 blog-list">
            <div className="row p-0 m-0">
            {
                loader ? (
                    <PageLoader />
                ) : article.length > 0 ? (
                        article.map((data) => (
                            <Link key={data._id} to={`/articles/${data._id}`} className="col-6 pl-0 mt-4">
                                <div className="rounded bg-card">
                                <img
                                    className="img-fluid rounded"
                                    src={`${host.host}/images/${data.image}`}
                                    alt=""
                                />
                                <div className="p-4 text-white">
                                    <h4 className="text-white">{data.title}</h4>
                                    <div className="d-flex justify-content-between">
                                    <button className="btn btn-dark">
                                        <span className="text-success">
                                        <i className="bx bx-happy-heart-eyes" />
                                        </span>{" "}
                                        : {data.view_count}
                                    </button>
                                    <button className="btn btn-dark">
                                        <span className="text-success">
                                        <i className="bx bx-heart" />
                                        </span>{" "}
                                        : {data.like_count}
                                    </button>
                                    <button className="btn btn-dark">
                                        <span className="text-success">
                                        <i className="bx bx-message-square-dots" />
                                        </span>
                                        :{data.comment_count}
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </Link>
                    ))
                    ) : (
                        <div className="col-12">
                        <p>No Post Found.</p>
                        </div>
                    )
                }
            </div>
            
            <Paginate page={page} totalPage={totalPages} setPage={setPage} />
        </div>
    </Master>
  )
}

export default AllArticle