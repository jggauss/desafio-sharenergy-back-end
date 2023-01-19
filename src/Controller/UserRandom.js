const apiUserRandom = require('../../ConfigApi/ConfigApi')
const Users = require('../Models/User')
const UserControler = require('./UserControler')


class UserRandom {
    async list(req,res){

        await apiUserRandom.get('/api') 
        .then((response)=>{
             const dado = response.data.results[0]
             
             const usuario = {
                name: dado.name.first+' '+dado.name.last,
                email:dado.email,
                userName: dado.login.username,
                foto:dado.picture.medium,
                password : '$2b$10$uceV86k0Ag1jDMmPU/NwzeRUjOIA6BWCJ0lqLbYpyMng.SY9WcOJW',
                idade :dado.dob.age

             }
             criarUsuario(usuario)
            return res.json(response.data)
        })
        .catch((erro)=>{console.log(erro)
        })
    
    }
    
}

async function criarUsuario (dados) {
    
    try {
        await Users.create({name: dados.name,email:dados.email,userName:dados.userName, foto:dados.foto,password: dados.password,picture:dados.picture,idade:dados.idade})    
    } catch (error) {
        console.log(error)
    }

    
 }
module.exports = new UserRandom()




