import cliente from "../models/Cliente.js"

class ClienteControllers{
    async listAll(req,res){
            let result = await cliente.findAll()
            !result.validated
            ?res.status(404).json({sucess:false, message: result.error})
            :res.status(200).json({sucess:true, values: result.values})
        }
    
    async listById(req, res){
        const id = req.params.id
        if (isNaN(id)){
            res.status(406).json({sucess:false, values: "Id inválido!"})
        }else{

            let result = await cliente.findById(id)
            
            if(!result.validated){
                res.status(404).json({sucess:false, message: result.error})
            }

            result.values == undefined
            ?res.status(406).json({sucess:true, values: "Cliente não Encontrado"})
            :res.status(200).json({sucess:true, values:result.values})

        }
    }

    async newCliente(req,res){
        const {nome,contato} = req.body

        let result = await cliente.create(nome,contato)
        result.validated
        ?res.status(201).json({sucess:true})
        :res.status(404).json({sucess:false, message:result.error})
    }

    async insertCsv(req, res){
          
            const file = req.file.path
           
            const results = await cliente.insertViaCsv(file)
            if(!results.validated){
                res.status(404).json({sucess:false, message: results.err})
            }else{
                res.status(200).json({sucess:true, values: results.values})
            }
    
    }

    
}

export default new ClienteControllers()