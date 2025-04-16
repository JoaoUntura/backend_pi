import pedidoProduto from "../models/PedidoProduto.js"

class PedProdControllers{
    async listAll(req,res){
            let result = await pedidoProduto.findAll()
            !result.validated
            ?res.status(404).json({success:false, message: result.error})
            :res.status(200).json({success:true, values: result.values})
        }
    
    async listById(req, res){
        const id = req.params.id
        if (isNaN(id)){
            res.status(406).json({success:false, values: "Id inválido!"})
        }else{

            let result = await pedidoProduto.findById(id)
            
            if(!result.validated){
                res.status(404).json({success:false, message: result.error})
            }

            result.values == undefined
            ?res.status(406).json({success:true, values: "Pedido não Encontrado"})
            :res.status(200).json({success:true, values:result.values})


        }
    }

    async newPedidoProduto(req,res){
        let {pedido_id,produto_id,quantidade} = req.body

        if (!pedido_id || !produto_id || !quantidade){
            res.status(406).json({success:false, message: "Envie todos os campos necessários!"})
        }

        let result = await pedidoProduto.create(pedido_id,produto_id,quantidade)
        result.validated
        ?res.status(201).json({success:true, message:"pedido_produto criado com successo!"})
        :res.status(404).json({success:false, message:result.error})
    }
}

export default new PedProdControllers()