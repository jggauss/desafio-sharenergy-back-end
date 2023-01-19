const bcrypt  = require('bcrypt')
const { json } = require('body-parser')
const jwt = require('jsonwebtoken')
const Users = require('../Models/User')

class LoginController{
    async Login(req,res) {
        const {username,password} = req.body
    const user = await Users.findOne({userName:username})
        if(user===null){
            return res.status(400).json({
                erro:true,
                message:"Usuário ou senha incorretos"
            })
        }
    if(!(await bcrypt.compare(password,user.password))){
        return res.status(400).json({
            erro:true,
            message:"Usuário ou senha incorretos"}
            )
    }
       
    const token = jwt.sign({userName:user.userName},process.env.SECRET,{expiresIn:'1d'})
    return res.json({
        erro:false,
        message:'Login efetuado com sucesso',
        token
    })

    }
    
}


module.exports = new LoginController()

