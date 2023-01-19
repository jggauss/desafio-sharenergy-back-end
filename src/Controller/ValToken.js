const Users = require("../Models/User")

class ValToken {
    
    async ValToken(req,res){
        await Users.findOne(
            {userName:req.userName},
            {
                password:0
            }
            )
        .then((user)=>{
            return res.json({
                erro:false,
                user
            })
        })
        .catch(()=>{
            return res.status(400).json({
                erro:true,
                message:"Usuário não encontrado"
            })
        })




    }
}
module.exports = new ValToken()