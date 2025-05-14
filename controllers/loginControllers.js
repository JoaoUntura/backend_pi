//requerer o models usuario
import users from "../models/User.js"
import dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken"
//requerer a função de comparar senha
import comparePasswordService from "../services/compare_password_service.js"

class LoginController{
    async login(req, res){
        let {email, password} = req.body
        let user = await users.findByEmail(email)
        
        if(user.values != undefined){
       
            let passValiated = comparePasswordService(password, user.values.password_hashed)
            if(!passValiated){
               res.status(406).json({success: false, message:"Senha Invalida"})
            }else{
                let token = jwt.sign({id:user.values.id,email: user.values.email,role:user.values.role_id},process.env.SECRET,{expiresIn:100000}) 
                res.status(200).json({success: true, token: token})
            }
        }else{
            user.values == undefined
            ? res.status(406).json({success: false, message:'E-mail não encontrado'})
            : res.status(404).json({success: false, message: user.error})
        }
    }

}

export default new LoginController();