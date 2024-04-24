import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcryptjs';

export const changePassword = async (req, res)=>{
   const {currentPassword, newPassword} = req.body;
   
   const authUser = req.AuthUser;
   const findUser  = await UserModel.findById(authUser._id);
   const comparePassword = bcrypt.compareSync(currentPassword, findUser.password);

   if(!comparePassword){
      return res.json('fail');
   }
  
   const salt = bcrypt.genSaltSync(10);
   const hashPassword = bcrypt.hashSync(newPassword, salt);

   await UserModel.findByIdAndUpdate(authUser._id,{
      password: hashPassword
   });

   return res.json('success');
}
