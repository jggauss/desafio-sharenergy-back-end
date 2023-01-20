const jwt = require('jsonwebtoken')
const { promisify } = require("util")
require('dotenv').config()

class ValidarToken{
    
 async ValidarToken(req,res,next){
    const authHeader = req.headers.authorization
    const [bearer,token] =authHeader.split(' ')
    if(!token){
        return res.status(400).json({
            erro:true,
            message:"Erro. Usuário deve estar logado!"
        })
    }

    try {
        const decoded = await promisify(jwt.verify)(token,">7vc!q_%")
        req.userName = decoded.userName
        return next()
    } catch (error) {
        return res.status(400).json({
            erro:true,
            message:"Erro. Erro ao verificar o login!"
        })
    }

    return res.json({message:token})
}

}
module.exports = new ValidarToken()