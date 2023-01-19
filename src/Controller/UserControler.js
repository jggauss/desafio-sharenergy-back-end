const Users = require('../Models/User')
const Yup = require("yup")
const bcrypt = require('bcrypt')

class UserController {
    //cria usuário
    async create(req, res) {
        const { name, email, userName, foto, password, idade } = req.body
        
        const schema = Yup.object().shape({
            name: Yup.string().required("O nome deve ter pelo menos 4 caracteres").min(4),
            email: Yup.string("Deve ser digitado um email").required("Deve ser digitado um email").email(),
            userName: Yup.string("O username deve ter pelo menos 4 caracteres").required("O username deve ter pelo menos 4 caracteres").min(4),
            password: Yup.string("A senha deve ter pelo menos 6 caracteres").required("A senha deve ter pelo menos 6 caracteres").min(6),
            idade: Yup.string().required()

        })


        try {
            await schema.validate(req.body)
        } catch (err) {
            return res.status(400).json({
                erro: true,
                mensagem: err.errors
            })
        }


        // if(!(await schema.isValid(req.body))){
        //     return res.status(400).json("Erro ao validar o Schema")
        // }
        //conferindo se email e userName já estão cadastrados
        const findEmail = await Users.findOne({ email: email })
        if (findEmail) {
            return res.status(400).json("Email de usuário já existe")
        }
        const findUserName = await Users.findOne({ userName: userName })
        if (findUserName) {
            return res.status(400).json("Username de usuário já existe")
        }

        //encriptar senha
        const hash = bcrypt.hashSync(password, 10)


        try {
            const createdUser = await Users.create({ name, email, userName, foto, password: hash, idade })
            return res.json({
                erro: false,
                message: "Usuário criado com sucesso."
            })
        } catch (error) {
            return res.json({
                erro: true,
                message: "Erro.Usuário não foi criado. "
            })
        }
    }
    //lista todos os usuários
    async list(req, res) {
        const { page, pesquisa } = req.params
        const limit = 6
        var lastPage = 1


        const countUser = await Users.count({})
        if (countUser === null) {
            return res.status(400).json({
                erro: true,
                message: "Erro. Não há usuários cadastrados"
            })

        } else {
            lastPage = Math.ceil(countUser / limit)
        }

        try {
            const users = await Users.find().sort({ "name": 1 }).skip((Number(page * limit) - limit)).limit(limit)
            return res.status(200).json({
                users,
                countUser,
                lastPage,

            })
        } catch (error) {
            return res.status(400).json("Erro ao acessar a base de dados")
        }
    }

    async search(req, res) {
        const { page, pesquisa } = req.params
        const limit = 6
        var lastPage = 1


        const countUser = await Users.count({})
        if (countUser === null) {
            return res.status(400).json({
                erro: true,
                message: "Erro. Não há usuários cadastrados"
            })

        } else {
            lastPage = Math.ceil(countUser / limit)
        }

        try {
            const users = await
                Users.find({
                    $or: [
                        { name: { $regex: pesquisa, $options: 'i' } },
                        { userName: { $regex: pesquisa, $options: 'i' } },
                        { email: { $regex: pesquisa, $options: 'i' } }]
                }).limit(6)
            return res.status(200).json({
                users,
                countUser,
                lastPage,

            })
        } catch (error) {
            return res.status(400).json("Erro ao acessar a base de dados")
        }
    }


    async consult(req, res) {
        const { userName } = req.body

        await Users.findOne({ userName: userName })
            .then((response) => {

                return res.json(response)
            })
            .catch((erro) => {
                return res.json({
                    erro: true,
                    message: "Erro. Não há usuários cadastrados"
                }

                )
            })
    }

}
module.exports = new UserController()