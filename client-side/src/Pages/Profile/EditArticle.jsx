import Select from 'react-select'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import PageLoader from '../../Components/PageLoader';
import Master from '../Layout/Master';
import { useNavigate, useParams } from 'react-router';
import data from '../../Data/Data';

const EditArticle = () => {
    const navigate = useNavigate();
    const [tag, setTag] = useState([]);
    const [language, setLanguage] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState({});
    const [description, setDescription] = useState({});
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [loader, setLoader] = useState(true);

    const [dbImage, setDBImage] = useState('');
    const [dbTag, setDBTag] = useState([]);
    const [dbLanguage, setDBLanguage] = useState([]);
    const {id} = useParams();
   
    useEffect(()=>{
        setLoader(true);

    const getData = async () =>{
        // await axios.get('/auth/article/'+id).then(d=>{
        //     console.log(d.data);
        // });

        // await axios.get('/auth/article/tag-language').then(d=>{
        //     setLoader(false);
        //      setTag(d.data.tag);
        //      setLanguage(d.data.language);
        //  })

        // In above code, there are two axios requests and second request will only start after the first request is done. This would not be efficient if the two requests are independent and could be made concurrently.
        //Therefore, we use Promise.All() method to handle multiple async operations at concurrently. By pushing these promises into an array and then using Promise.all, the code effectively waiting for both requests to complete before proceeding.
        const tagLangRequest = await axios.get('/auth/article/tag-language');
        const articleRequest = await axios.get('/auth/article/'+id);
        
        Promise.all([tagLangRequest, articleRequest]).then((res)=>{
            //console.log(res);
            const tagLangData =res[0].data;
            const articleData = res[1].data[0];
            console.log(articleData)
            setLoader(false);
            setTag(tagLangData.tag);
            setLanguage(tagLangData.language);
            setTitle(articleData.title);

            setDBImage(articleData.image);
            setDescription(articleData.description);
            setDBTag(articleData.tags);
            setDBLanguage(articleData.languages);
            //console.log(title);
            console.log(image)
            console.log(dbImage)
        })
    }
     
    getData();
     
    },[]);

    const selectedTag = ()=>{
        const data = [];
        tag.map(sTag=> {
            dbTag.map(sDBTag=>{
                if(sDBTag.slug == sTag.value){
                    data.push(sTag);
                }
            });
        });
        setTags(data);
        return data;
    }

    const selectedLanguage = ()=>{
        const data = [];
        language.map(sLang=> {
            dbLanguage.map(sDBLang=>{
                if(sDBLang.slug == sLang.value){
                    data.push(sLang);
                }
            });
        });
        setLanguages(data);
        return data;
    }
 
    const store = async () => {
         var formdata = new FormData();
         formdata.append('title', title);
         formdata.append('image',image);
         formdata.append('description',description);
         formdata.append('tags',JSON.stringify(tags));
         formdata.append('languages',JSON.stringify(languages));
        
         await axios.post('/auth/article/'+id,formdata).then((d) =>{
            //console.log(d.data);
             if(d.data){
                setDBImage(d.data);
                 toast.success('succcess');
                 navigate('/profile');
                 //return;
             }
             toast.error('Wrong Someting.');
         });
    };
   return (
    <div className='my-4'>
    {loader && <PageLoader />}
        {!loader && (
            <Master>
                <div className="row mt-3">
                    <div className="col-6">
                        <input value={title} type="text" className="form-control bg-dark" placeholder="Enter Title"
                        onChange={(e)=> setTitle(e.target.value)}
                        />
                    </div>

                    <div className="col-6">
                        <input type="file" className="form-control bg-dark" 
                        onChange={(e)=>setImage(e.target.files[0])}
                        />

                        <img className='w-50 mt-2' src={`${data.host}/images/${dbImage}`} alt="" />
                    </div>
                </div>
 
                <div className="row mt-3">
                    <div className="col-6">
                        <Select options={tag} isMulti={true} placeholder="Choose tags" 
                        onChange={(data)=>setTags(data)} defaultValue={selectedTag}
                        />
                    </div>
        
                    <div className="col-6">
                        <Select options={language} isMulti={true} placeholder="Choose languages"
                        onChange={(data)=>setLanguages(data)} defaultValue={selectedLanguage}
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
                        <button className="btn btn-primary" onClick={store}>Update</button>
                    </div>
                </div>
            </Master>
        )}
    </div>      
   )
}

export default EditArticle