const mongoose = require('mongoose')


const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ClientesShchema = new Schema({
    id:ObjectId,
    nome:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require: true,
        lowercase:true,
    },
    telefone:{
        type:String,
        require:true,
    },
    rua:{
        type:String,
        require:true,
    },
    numero:{
        type:String,
        require:true,
    },
    bairro:{
        type:String,
        require:true,
    },
    cep:{
        type:String,
        require:true,
    },
    cidade:{
        type:String,
        require:true,
    },
    cpf:{
        type:String,
        require:true,
    },
    estado:{
        type:String,
        
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const Clientes = mongoose.model('Clientes',ClientesShchema)

module.exports = Clientes