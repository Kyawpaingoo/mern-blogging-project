import validator from 'indicative/validator.js'
import { errorJson, successJson } from './Utils/JsonRes.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../Models/UserModel.js';

export const login = (req, res) =>{
    res.send('log in')
}

export const register = async (req, res) => {
    //console.log(req.body);
    const {name, email, password} = req.body;
    const findUser = await UserModel.findOne({email});

    if(findUser) {
        return res.json(errorJson("email exist", null))
    }

    validator.validateAll(req.body, {
        name:"required",
        email:"required|email",
        password:"required|min:4"
    }).then(async ()=>{
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const createdUser = await UserModel.create({
            name,
            email,
            password: hashPassword
        });
        const jwt_secrect = process.env.JWT_TOKEN;
        const access_token = jwt.sign({email, id:createdUser._id}, jwt_secrect)
        res.cookie('access_token', access_token, {httpOnly: true});
        return res.json(successJson('success'));
    }).catch((e)=>{
        return res.json(errorJson("validate_error", e))
    })
}