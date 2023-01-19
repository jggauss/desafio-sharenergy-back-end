const mongoose = require('mongoose')


const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    id:ObjectId,
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require: true,
        lowercase:true,
    },
    userName:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
        
    },
    foto:{
        type:String,
        require:true,
    },
    idade:{
        type: String,
       
    },
    status:{
        type:String,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const Users = mongoose.model('Users',UserSchema)

module.exports = Users