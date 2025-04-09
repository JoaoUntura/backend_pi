import produto from "../models/Produtos.js"

class ProdutoControler{
    async listAll(req,res){
            let result = await produto.findAll()
            !result.validated
            ?res.status(404).json({sucess:false, message: result.error})
            :res.status(200).json({sucess:true, values: result.values})
        }
    
    async listById(req, res){
        const id = req.params.id
        if (isNaN(id)){
            res.status(406).json({sucess:false, values: "Id inválido!"})
        }else{

            let result = await produto.findById(id)
            
            if(!result.validated){
                res.status(404).json({sucess:false, message: result.error})
            }

            result.values == undefined
            ?res.status(406).json({sucess:true, values: "Produto não Encontrado"})
            :res.status(200).json({sucess:true, values:result.values})


        }
    }

      
    async insertCsv(req, res){

      
        const file = req.file.path
       
        const results = await produto.insertViaCsv(file)
        if(!results.validated){
            res.status(404).json({sucess:false, message: results.err})
        }else{
            res.status(200).json({sucess:true, values: results.values})
        }


        
    }
}

export default new ProdutoControler()