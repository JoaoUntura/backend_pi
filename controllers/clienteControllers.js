import cliente from "../models/Cliente.js"

class ClienteControllers{
    async listAll(req,res){
            let result = await cliente.findAll()
            !result.validated
            ?res.status(404).json({success:false, message: result.error})
            :res.status(200).json({success:true, values: result.values})
        }
    
    async listById(req, res){
        const id = req.params.id
        if (isNaN(id)){
            res.status(406).json({success:false, message: "Id inválido!"})
        }else{

            let result = await cliente.findById(id)
            
            if(!result.validated){
                res.status(404).json({success:false, message: result.error})
            }

            result.values == undefined
            ?res.status(406).json({success:true, values: "Cliente não Encontrado"})
            :res.status(200).json({success:true, values:result.values})

        }
    }

    async newCliente(req,res){
        let {nome,contato} = req.body

        if (!nome || !contato){
            res.status(406).json({success:false, message: "Envie todos os campos necessários!"})
        }

        let result = await cliente.create(nome,contato)
        result.validated
        ?res.status(201).json({success:true, message:"Cliente criado com successo!"})
        :res.status(404).json({success:false, message:result.error})
    }
    
    async editClient(req,res){
        let id = req.params.id
        let {nome, contato} = req.body

        if (isNaN(id)){
            res.status(406).json({success:false, message: "Id inválido!"})
        }else{
            let result = await cliente.update(id, nome, contato)

            result.validated 
            ?res.status(200).json({success:true, message:"Update realizado com successo"})
            :res.status(404).json({success:false, message:result.error})
        }

   
    }

    async deleteClient(req,res){
        let id = req.params.id

        if (isNaN(id)){
            res.status(406).json({success:false, message: "Id inválido!"})
        }else{
            let result = await cliente.delete(id)

            result.validated 
            ?res.status(200).json({success:true, message:"Deletado com successo"})
            :res.status(404).json({success:false, message:result.error})
        }

   
    }

    async insertCsv(req, res){
          
        const file = req.file.path
        if (!file){
            res.status(406).json({success:false, message: "Envie o arquivo no formato CSV!"})
        }

        const results = await cliente.insertViaCsv(file)

        results.validated
        ?res.status(404).json({success:false, message: results.err})
        : res.status(201).json({success:true, message: "Informações inseridas com successo!"})
    
    }

    
}

export default new ClienteControllers()