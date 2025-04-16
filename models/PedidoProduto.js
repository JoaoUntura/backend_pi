import db from "../config/database.js";

 class PedidoProduto{

    async findAll(){
        try {
            const PedidoProduto = await db.select("id", "pedido_id", "produto_id", "quantidade").table("pedido_produto")
            return {validated: true, values:PedidoProduto}
        } catch (error) {
            return {validated: false, error: error}
        }
           }

        async create(pedido_id, produto_id,quantidade){
        try{
            await db.insert({pedido_id:pedido_id, produto_id:produto_id, quantidade:quantidade}).table("pedido_produto")
            return {validated:true}
        }catch(error){
            return {validated: false, error: error}
        }
        }

    async findById(id){
        try{

            const PedidoProduto = await db.select("id", "pedido_id", "produto_id", "quantidade").where("id", id).table("pedido_produto")
            return PedidoProduto.length > 0 
            ?{validated:true, values:PedidoProduto}
            :{validated:true, values:undefined}

        }catch(error){
            return {validated: false, error: error}
        }
    }

}

export default new PedidoProduto()