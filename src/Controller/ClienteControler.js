const Clientes = require('../Models/Clientes')
const yup = require('yup')
const { count } = require('../Models/Clientes')

class ClienteController {
    //cria um cliente
    async create(req, res) {
        const { nome, email, telfone, rua, numero, bairro, telefone, cidade, cep, cpf, estado } = req.body
       
        const schema = yup.object().shape({
            nome: yup.string().required("O nome deve ter pelo menos 4 caracteres").min(4),
            email: yup.string("Deve ser digitado um email").required("Deve ser digitado um email").email(),

        })
        try {
            await schema.validate(req.body)
        } catch (err) {
            return res.status(400).json(err.message)
        }

        const findEmail = await Clientes.findOne({ email: email })
        if (findEmail) {
            return res.status(400).json("Email de usuário já existe")
        }







        try {
            const createCliente = await Clientes.create({ nome, email, telefone, rua, numero, bairro, cep, cidade, cpf, estado })
            return res.json({
                erro: false,
                message: "Cliente criado com sucesso."
            })
        } catch (error) {
            return res.json({
                erro: true,
                message: "Erro.Cliente não foi criado. "
            })
        }
    }
    //busca todos os clientes
    async list(req, res) {
        const {page} = req.params
        const limit = 6
        var lastPage = 1

        const countCliente = await Clientes.count({})
        if (countCliente === null) {
            return res.status(400).json({
                erro: true,
                message: "Erro. Não há clientes cadastrados"
            })

        } else {
            lastPage = Math.ceil(countCliente / limit)
        }
        try {
            const clientes = await Clientes.find().sort({ "nome": 1 }).skip((Number(page * limit) - limit)).limit(limit)
            return res.status(200).json({
                clientes,
                countCliente,
                lastPage,

            })
        } catch (error) {
            return res.status(400).json("Erro ao acessar a base de dados")
        }

    }
    async consult(req, res) {
        const { _id } = req.params
        try {
            const cliente = await Clientes.findById({ _id })
            return res.status(200).json(
                cliente
            )
        } catch (error) {
            return res.status(400).json({
                erro: true,
                message: "Erro.Cliente não foi criado. "
            })
        }

    }
    async deleta(req, res) {
        const { _id } = req.params
        await Clientes.remove({ _id })
            .then(() => {
                return res.status(200).json({
                    erro: false,
                    message: "Cliente deletado com sucesso "
                })
            })
            .catch((error) => {
                return res.status(400).json({
                    erro: true,
                    message: "Erro.Cliente não foi criado. "
                })
            })

    }
    async altera(req, res) {
        const { _id } = req.params
        const dados =req.body
        await Clientes.updateOne({_id},
            {$set:{
                nome:dados.nome,
                email:dados.email,
                cpf:dados.cpf,
                telefone:dados.telefone,
                rua:dados.rua,
                numero:dados.numero,
                bairro:dados.bairro,
                cidade:dados.cidade,
                cep:dados.cep,
                estado:dados.estado}})
        .then((response) => {
            return res.status(200).json({
                erro: false,
                message: "Cliente alterado com sucesso "
            })
        })
        .catch((error) => {
            return res.status(400).json({
                erro: true,
                message: "Erro.Cliente não foi alterado. "
            })
        })

       
    }




}
module.exports = new ClienteController()