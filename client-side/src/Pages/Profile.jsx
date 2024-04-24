import { useState } from "react";
import Master from "./Layout/Master";
import CrateArticle from "./Profile/CrateArticle.jsx";
import MyArticle from "./Profile/MyArticle.jsx";
import AccountSetting from "./Profile/AccountSetting.jsx";

const Profile = () => {
    const [type, setType] = useState('myArticle');

    const handleTabChange = (tab) => {
        setType(tab);
    }
    return(
        <Master>
            <button onClick={()=>handleTabChange('createArticle')} className={`btn btn-${type=='createArticle' ? 'primary' : 'dark'}`}>
                Create New Article
            </button>
            <button onClick={()=>handleTabChange('myArticle')} className={`btn btn-${type=='myArticle' ? 'primary' : 'dark'}`}>
                My Aritcles
            </button>
            <button onClick={()=>handleTabChange('setting')} className={`btn btn-${type=='setting' ? 'primary' : 'dark'}`}>
                Account Settings
            </button>

            {type == 'createArticle' && <CrateArticle handleTabChange={handleTabChange}/>}
            {type == 'myArticle' && <MyArticle />}
            {type == 'setting' && <AccountSetting handleTabChange={handleTabChange} />}
            
        </Master>
    )
}

export default Profile