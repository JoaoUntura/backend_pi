import produto from "../models/Produtos.js"

class ProdutoControler{
    async listAll(req,res){
            let result = await produto.findAll()
            !result.validated
            ?res.status(404).json({success:false, message: result.error})
            :res.status(200).json({success:true, values: result.values})
        }
    
    async listById(req, res){
        const id = req.params.id
        if (isNaN(id)){
            res.status(406).json({success:false, values: "Id inválido!"})
        }else{

            let result = await produto.findById(id)
            
            if(!result.validated){
                res.status(404).json({success:false, message: result.error})
            }

            result.values == undefined
            ?res.status(406).json({success:true, values: "Produto não Encontrado"})
            :res.status(200).json({success:true, values:result.values})


        }
    }
    async newProduto(req,res){
        let {nome,preco} = req.body

        if (!nome || !preco){
            res.status(406).json({success:false, message: "Envie todos os campos necessários!"})
        }

        let result = await produto.create(nome,preco)
        result.validated
        ?res.status(201).json({success:true, message:"Produto criado com sucesso!"})
        :res.status(404).json({success:false, message:result.error})
    }
    
       async editProduto(req,res){
            let id = req.params.id
            let {nome,preco} = req.body
    
            if (isNaN(id)){
                res.status(406).json({success:false, message: "Id inválido!"})
            }else{
                let result = await produto.update(id, nome,preco)
    
                result.validated 
                ?res.status(200).json({success:true, message:"Update realizado com successo"})
                :res.status(404).json({success:false, message:result.error})
            }
    
        }

    async insertCsv(req, res){

      
        const file = req.file.path
        if (!file){
            res.status(406).json({sucess:false, message: "Envie o arquivo no formato CSV!"})
        }

        const results = await produto.insertViaCsv(file)
        if(!results.validated){
            res.status(404).json({success:false, message: results.err})
        }else{
            res.status(200).json({success:true, values: results.values})
        }


        
    }
}

export default new ProdutoControler()