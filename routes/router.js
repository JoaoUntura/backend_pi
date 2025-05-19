import express from "express"
import produtoControllers from "../controllers/produtoControllers.js"
import pedidoControllers from "../controllers/pedidoControllers.js"
import clienteControllers from "../controllers/clienteControllers.js"
import pedProdControllers from "../controllers/pedProdControllers.js"
import userControllers from "../controllers/userControllers.js"
import loginControllers from "../controllers/loginControllers.js"
import middleware from "../middleware/auth_user_middleware.js"
import middlewareAdmin from "../middleware/auth_admin_middleware.js"
import middlewareEditUser from "../middleware/auth_edit_middleware.js"
import multer from "multer"


const upload = multer({ dest: 'uploads/' });
const router = express.Router()

router.get('/produto', middleware,produtoControllers.listAll)
router.get('/produto/:id', middleware,produtoControllers.listById)
router.put('/produto/:id', middlewareAdmin, produtoControllers.editProduto)
router.delete('/produto/:id',middlewareAdmin, produtoControllers.deleteProduto)
router.post('/produto', middlewareAdmin, produtoControllers.newProduto)
router.post('/produto/csv', upload.single('file'), middlewareAdmin, produtoControllers.insertCsv)


router.get('/pedido',middleware,pedidoControllers.listAll)
router.get('/pedido/:id',middleware, pedidoControllers.listById)
router.put('/pedido/:id', middlewareAdmin, pedidoControllers.editPedido)
router.delete('/pedido/:id',middlewareAdmin, pedidoControllers.deletePedido)
router.post('/pedido',middlewareAdmin, pedidoControllers.newPedido)
router.post('/pedido/csv', upload.single('file'),middlewareAdmin, pedidoControllers.insertCsv)

router.get('/cliente',middleware, clienteControllers.listAll)
router.get('/cliente/:id',middleware, clienteControllers.listById)
router.put('/cliente/:id', middlewareAdmin, clienteControllers.editClient)
router.delete('/cliente/:id', middlewareAdmin,clienteControllers.deleteClient)
router.post('/cliente', middlewareAdmin,clienteControllers.newCliente)
router.post('/cliente/csv', upload.single('file'), middlewareAdmin, clienteControllers.insertCsv)

router.get('/pedido_produto', middleware, pedProdControllers.listAll)
router.get('/pedido_produto/:id',middleware, pedProdControllers.listById)
router.put('/pedido_produto/:id', middlewareAdmin,pedProdControllers.editPedidoProduto)
router.delete('/pedido_produto/:id', middlewareAdmin, pedProdControllers.deletePedidoProduto)
router.post('/pedido_produto', middlewareAdmin, pedProdControllers.newPedidoProduto)


router.get('/user', middlewareAdmin, userControllers.listAll)
router.get('/user/:id', middlewareAdmin, userControllers.listById)
router.put('/user/:id', middlewareEditUser,userControllers.editUser)
router.delete('/user/:id',middlewareAdmin, userControllers.deleteUser)
router.post('/user',middlewareAdmin, userControllers.newUser)

router.post('/login', loginControllers.login)

export default router