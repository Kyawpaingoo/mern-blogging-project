import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import PageLoader from '../../Components/PageLoader.jsx';

const TagComponents = () => {
    const [tag, setTag] = useState([]);
    const [language, setLanguage] = useState([]);
    const [loader, setLoader] = useState(true);
    
    useEffect(()=>{
        const getData = async()=>{
            setLoader(true);
            await axios.get('/get-taglangs').then(d=>{
                setLoader(false);
                setTag(d.data.tags);
                
                setLanguage(d.data.langs);
            })
        }
        getData();
    },[]);
  return (
    <>
        <div className="bg-card p-3 mt-4">
            <h5 className="text-primary">Tags</h5>
            {
                loader ? (
                    <PageLoader />
                )  : (     
                    tag.length > 0 ? (
                        tag.map(d=>(
                            <Link
                            key={d._id} to={`article/?tag=${d.slug}`} className="btn btn-sm btn-dark mt-1">
                                {d.name}
                            </Link>
                        ))
                    ) : (
                        <span>No Tag Found.</span>
                    ) 
                )
            }
        </div>

        <div className="bg-card p-3 mt-4">
            <h5 className="text-primary">Programming</h5>
            {
                loader ? (
                    <PageLoader />
                )  : (     
                    language.length > 0 ? (
                        language.map(d=>(
                            <Link
                            key={d._id} to={`article/?lang=${d.slug}`} className="btn btn-sm btn-dark mt-1">
                                {d.name}
                            </Link>
                        ))
                    ) : (
                        <span>No Language Found.</span>
                    ) 
                )
            }
        </div>
    </>
   
  )
}

export default TagComponents