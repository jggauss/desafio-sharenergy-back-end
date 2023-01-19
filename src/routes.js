const { Router } =require('express')
require('dotenv').config()
const UserController = require('./Controller/UserControler.js')
const ImageController = require('./Controller/Imagecontroller.js')
const addImage = require('./middlewares/addimages.js')
const LogginController = require('./Controller/LogginController.js')
const { ValidarToken } = require('./middlewares/ValidarToken.js')
const {EncontraUsuario} = require('./Controller/ValToken.js')
const ValToken = require('./Controller/ValToken.js')
const UserRandom = require('./Controller/UserRandom.js')
const ClienteControler = require('./Controller/ClienteControler')



const routes = Router()
//busca um usuário
routes.get('/user',ValidarToken,UserController.consult)

//criar usuário
routes.post('/user',ValidarToken,UserController.create)

//Busca pesquisa e faz paginação usuários
routes.get('/users/:page/:pesquisa',ValidarToken,UserController.search)
routes.get('/users/:page',ValidarToken,UserController.list)

//rota para criar usuários pelo insomnia
routes.get('/usersrandom',ValidarToken, UserRandom.list)
//busca imagem ao cadastrar usuário
routes.post('/image/:id',addImage.single('image'),ImageController.create)

//login
routes.post('/login', LogginController.Login)
routes.get('/login', (req,res)=>{})
//valida usuário para conferir se está cadastrado e se o token faz sentido
routes.get('/valtoken',ValidarToken ,ValToken.ValToken)


//clientes
//inclui cliente
routes.post('/cliente',ValidarToken,ValidarToken,ClienteControler.create)
routes.get('/clientes/:page',ValidarToken,ClienteControler.list)
routes.get('/cliente/:_id',ValidarToken,ClienteControler.consult)
routes.delete('/cliente/:_id',ValidarToken,ClienteControler.deleta)
routes.put('/cliente/:_id',ValidarToken,ClienteControler.altera)

module.exports = routes