import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import PageLoader from '../../Components/PageLoader.jsx';

const TagComponents = () => {
    const [tag, setTag] = useState([]);
    const [language, setLanguage] = useState([]);
    const [loader, setLoader] = useState(true);
    
    useEffect(()=>{
        const getData = async()=>{
            //setLoader(true);
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
                tag.length > 0 ? (
                    loader ? (
                        <PageLoader />
                    )  : (     
                    
                        tag.map(d=>(
                            <Link
                            key={d._id} to={`/articles?tag=${d._id}`} className="btn btn-sm btn-dark mt-1">
                                {d.name}
                            </Link>
                        )
                        ))
                ) : (
                    <span>No Tag Found.</span>
                ) 
            }
        </div>

        <div className="bg-card p-3 mt-4">
            <h5 className="text-primary">Programming</h5>
            {   
                language.length > 0 ? (
                    loader ? (
                        <PageLoader />
                    )  : (     
                        language.map(d=>(
                            <Link
                            key={d._id} to={`/articles?language=${d._id}`} className="btn btn-sm btn-dark mt-1">
                                {d.name}
                            </Link>
                        ))
                    )
                ) : (
                    <span>No Language Found.</span>
                ) 
            }
        </div>
    </>
   
  )
}

export default TagComponents