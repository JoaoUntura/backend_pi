import user from "../models/User.js"
import hashPasswordService from "../services/hash_password_service.js"

class UserControllers{
    async listAll(req,res){
            let result = await user.findAll()
            !result.validated
            ?res.status(404).json({success:false, message: result.error})
            :res.status(200).json({success:true, values: result.values})
        }
    
    async listById(req, res){
        const id = req.params.id
        if (isNaN(id)){
            res.status(406).json({success:false, message: "Id inválido!"})
        }else{

            let result = await user.findById(id)
            
            if(!result.validated){
                res.status(404).json({success:false, message: result.error})
            }

            result.values == undefined
            ?res.status(406).json({success:true, values: "user não Encontrado"})
            :res.status(200).json({success:true, values:result.values})

        }
    }

    async newUser(req,res){
    
        let {nome, email, password, role} = req.body
        
      
        if (!nome || !email ||!password || !role){
            res.status(406).json({success:false, message: "Envie todos os campos necessários!"})
        }

        let result = await user.create(email, hashPasswordService(password),role,nome)

        result.validated
        ?res.status(201).json({success:true, message:"User criado com successo!"})
        :res.status(404).json({success:false, message:result.error})
    }
    
    async editUser(req,res){
        let id = req.params.id
        let {nome, email} = req.body

        if (isNaN(id)){
            res.status(406).json({success:false, message: "Id inválido!"})
        }else{
            let result = await user.update(id,nome, email)

            result.validated 
            ?res.status(200).json({success:true, message:"Update realizado com successo"})
            :res.status(404).json({success:false, message:result.error})
        }

   
    }

    async deleteUser(req,res){
        let id = req.params.id

        if (isNaN(id)){
            res.status(406).json({success:false, message: "Id inválido!"})
        }else{
            let result = await user.delete(id)

            result.validated 
            ?res.status(200).json({success:true, message:"Deletado com successo"})
            :res.status(404).json({success:false, message:result.error})
        }

   
    }
    
}

export default new UserControllers()