import { useState } from "react"
import axios from 'axios';
import {toast} from 'react-toastify';

const AccountSetting = ({ handleTabChange }) => {
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const changePassword = async ()=>{
      const data = {currentPassword, newPassword};
      await axios.post('/auth/changePassword', data).then(d =>{
        if(d.data=='fail'){
          toast.error('Wrong Password!');
          return;
        } 
        if(d.data=='success'){
          toast.success('Password Successfully Changed!');
          handleTabChange('myArticle');
        }
      })
  }
  return (
    <div className="row mt-3">
      <div className="col-12">
        <div className="form-group">
            <label>Enter Current Password</label>
            <input type="text" className="form-control" onChange={e=>setCurrentPassword(e.target.value)} />
        </div>

        <div className="form-group">
            <label>Enter New Password</label>
            <input type="text" className="form-control" onChange={e=>setNewPassword(e.target.value)}/>
        </div>

        <button className="btn btn-primary" onClick={changePassword}>Change</button>
      </div>
    </div>
  )
}

export default AccountSetting   