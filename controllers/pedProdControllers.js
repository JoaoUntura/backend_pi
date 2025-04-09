import pedido from "../models/PedidoProduto.js"

class PedProdControllers{
    async listAll(req,res){
            let result = await pedido.findAll()
            !result.validated
            ?res.status(404).json({sucess:false, message: result.error})
            :res.status(200).json({sucess:true, values: result.values})
        }
    
    async listById(req, res){
        const id = req.params.id
        if (isNaN(id)){
            res.status(406).json({sucess:false, values: "Id inválido!"})
        }else{

            let result = await pedido.findById(id)
            
            if(!result.validated){
                res.status(404).json({sucess:false, message: result.error})
            }

            result.values == undefined
            ?res.status(406).json({sucess:true, values: "Pedido não Encontrado"})
            :res.status(200).json({sucess:true, values:result.values})


        }
    }
}

export default new PedProdControllers()