import dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken"

//iniciar a middleware

export default function middlewareEditUser(req,res,next){
    const auth = req.headers['authorization']
    if(auth != undefined){
        try {
            const bearer = auth.split(' ')
            let token = bearer[1]
            let payload = jwt.verify(token,process.env.SECRET)
            
            if (payload.role === 1){
                next()
            }else if(payload.role === 2){
                let id = req.params.id
                payload.id === id
                ? next()
                :res.status(403).json({success: false, message:'Usuário sem permissão,'})
            }else{
                res.status(403).json({success: false, message:'Usuário sem permissão,'})
            }
            
        } catch (error) {
            return res.status(403).json({success: false, erro: error, message:'Token inválido'})
        }

    }else{
        return res.status(403).json({success: false, message:'Usuário não Autenticado'})
    }
}