import express from "express"
import produtoControllers from "../controllers/produtoControllers.js"
import pedidoControllers from "../controllers/pedidoControllers.js"
import clienteControllers from "../controllers/clienteControllers.js"
import pedProdControllers from "../controllers/pedProdControllers.js"
import userControllers from "../controllers/userControllers.js"
import loginControllers from "../controllers/loginControllers.js"
import middleware from "../middleware/auth_user_middleware.js"
import multer from "multer"


const upload = multer({ dest: 'uploads/' });
const router = express.Router()

router.get('/produto', produtoControllers.listAll)
router.get('/produto/:id', produtoControllers.listById)
router.put('/produto/:id', produtoControllers.editProduto)
router.delete('/produto/:id', produtoControllers.deleteProduto)
router.post('/produto',produtoControllers.newProduto)
router.post('/produto/csv', upload.single('file'), produtoControllers.insertCsv)


router.get('/pedido', middleware, pedidoControllers.listAll)
router.get('/pedido/:id', pedidoControllers.listById)
router.put('/pedido/:id', pedidoControllers.editPedido)
router.delete('/pedido/:id', pedidoControllers.deletePedido)
router.post('/pedido', pedidoControllers.newPedido)
router.post('/pedido/csv', upload.single('file'), pedidoControllers.insertCsv)

router.get('/cliente', clienteControllers.listAll)
router.get('/cliente/:id', clienteControllers.listById)
router.put('/cliente/:id', clienteControllers.editClient)
router.delete('/cliente/:id', clienteControllers.deleteClient)
router.post('/cliente', clienteControllers.newCliente)
router.post('/cliente/csv', upload.single('file'), clienteControllers.insertCsv)

router.get('/pedido_produto', pedProdControllers.listAll)
router.get('/pedido_produto/:id', pedProdControllers.listById)
router.put('/pedido_produto/:id', pedProdControllers.editPedidoProduto)
router.delete('/pedido_produto/:id', pedProdControllers.deletePedidoProduto)
router.post('/pedido_produto', pedProdControllers.newPedidoProduto)


router.get('/user', userControllers.listAll)
router.get('/user/:id', userControllers.listById)
router.put('/user/:id', userControllers.editUser)
router.delete('/user/:id', userControllers.deleteUser)
router.post('/user', userControllers.newUser)

router.post('/login', loginControllers.login)

export default router