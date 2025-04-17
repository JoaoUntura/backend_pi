import pedido from "../models/Pedido.js";

class PedidoControler {
  async listAll(req, res) {
    let result = await pedido.findAll();
    !result.validated
      ? res.status(404).json({ success: false, message: result.error })
      : res.status(200).json({ success: true, values: result.values });
  }

  async listById(req, res) {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(406).json({ success: false, values: "Id inválido!" });
    } else {
      let result = await pedido.findById(id);

      if (!result.validated) {
        res.status(404).json({ success: false, message: result.error });
      }

      result.values == undefined
        ? res
            .status(406)
            .json({ success: true, values: "Pedido não Encontrado" })
        : res.status(200).json({ success: true, values: result.values });
    }
  }

  async newPedido(req, res) {
    let { data, cliente_id, total, forma_pagamento } = req.body;

    if (!data || !cliente_id || !total || !forma_pagamento) {
      res
        .status(406)
        .json({
          success: false,
          message: "Envie todos os campos necessários!",
        });
    }

    let result = await pedido.create(data, cliente_id, total, forma_pagamento);
    result.validated
      ? res
          .status(201)
          .json({ success: true, message: "Produto criado com successo!" })
      : res.status(404).json({ success: false, message: result.error });
  }

    async editPedido(req,res){
        let id = req.params.id
        let { data, cliente_id, total, forma_pagamento } = req.body;

        if (isNaN(id)){
            res.status(406).json({success:false, message: "Id inválido!"})
        }else{
            let result = await pedido.update(id, data, cliente_id, total, forma_pagamento)

            result.validated 
            ?res.status(200).json({success:true, message:"Update realizado com successo"})
            :res.status(404).json({success:false, message:result.error})
        }

    }
  
  async insertCsv(req, res) {
    const file = req.file.path;
    if (!file) {
      res
        .status(406)
        .json({ sucess: false, message: "Envie o arquivo no formato CSV!" });
    }

    const results = await pedido.insertViaCsv(file);
    if (!results.validated) {
      res.status(404).json({ success: false, message: results.err });
    } else {
      res.status(200).json({ success: true, values: results.values });
    }
  }
}

export default new PedidoControler();
