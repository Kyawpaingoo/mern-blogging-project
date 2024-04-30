import { useContext } from "react";
import AuthContext from "../../Context/AuthContext"
import Select from 'react-select'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import PageLoader from '../../Components/PageLoader';

const CrateArticle = ({ handleTabChange }) => {
    const {authUser, setAuthUser} = useContext(AuthContext);
    const [tag, setTag] = useState([]);
    const [language, setLanguage] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState({});
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [loader, setLoader] = useState(true);
 
    useEffect(()=>{
        setLoader(true);
     const getData = async ()=>{
         await axios.get('/auth/article/tag-language').then(d=>{
            setLoader(false);
             setTag(d.data.tag);
             setLanguage(d.data.language);
         })
     };
 
     getData();
    },[]);
 
    const store = async () => {
         var formdata = new FormData();
         formdata.append('title', title);
         formdata.append('image',image);
         formdata.append('description',description);
         formdata.append('tags',JSON.stringify(tags));
         formdata.append('languages',JSON.stringify(languages));
         formdata.append('author', authUser.name);
        
         await axios.post('/auth/article',formdata).then((d) =>{
           
             if(d.data == 'Article Created'){
                 toast.success('succcess');
                 handleTabChange('myArticle');
             }
             else{
                toast.error('Wrong Someting.');
             }
             
         });
    };
   return (
    <div className='my-4'>
    {loader && <PageLoader />}
        {!loader && (
            <>
                <div className="row mt-3">
                    <div className="col-6">
                        <input type="text" className="form-control bg-dark" placeholder="Enter Title"
                        onChange={(e)=> setTitle(e.target.value)}
                        />
                    </div>

                    <div className="col-6">
                        <input type="file" className="form-control bg-dark" 
                        onChange={(e)=>setImage(e.target.files[0])}
                        />
                    </div>
                </div>
 
                <div className="row mt-3">
                    <div className="col-6">
                        <Select options={tag} isMulti={true} placeholder="Choose tags" 
                        onChange={(data)=>setTags(data)}
                        />
                    </div>
        
                    <div className="col-6">
                        <Select options={language} isMulti={true} placeholder="Choose languages"
                        onChange={(data)=>setLanguages(data)}
                        />
                    </div>
                </div>
    
                <div className="row mt-3">
                    <div className="col-12">
                        <ReactQuill theme="snow" value={description} onChange={setDescription}
                        />
                    </div>
                </div>
    
                <div className="row mt-3">
                    <div className="col-12">
                        <button className="btn btn-primary" onClick={store}>Create</button>
                    </div>
                </div>
            </>
        )}
    </div>      
   )
}

export default CrateArticle