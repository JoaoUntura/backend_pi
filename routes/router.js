import express from "express"
import produtoControllers from "../controllers/produtoControllers.js"
import pedidoControllers from "../controllers/pedidoControllers.js"
import clienteControllers from "../controllers/clienteControllers.js"
import pedProdControllers from "../controllers/pedProdControllers.js"

import multer from "multer"
const upload = multer({ dest: 'uploads/' });
const router = express.Router()

router.get('/produtos', produtoControllers.listAll)
router.get('/produtos/:id', produtoControllers.listById)
router.post('/produtos/csv', upload.single('file'), produtoControllers.insertCsv)


router.get('/pedidos', pedidoControllers.listAll)
router.get('/pedidos/:id', pedidoControllers.listById)
router.post('/pedidos/csv', upload.single('file'), pedidoControllers.insertCsv)

router.get('/cliente', clienteControllers.listAll)
router.get('/cliente/:id', clienteControllers.listById)
router.post('/cliente', clienteControllers.newCliente)
router.post('/cliente/csv', upload.single('file'), clienteControllers.insertCsv)

router.get('/pedido_produto', pedProdControllers.listAll)
router.get('/pedido_produto/:id', pedProdControllers.listById)



export default router