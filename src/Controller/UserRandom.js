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
                password : "$2b$10$QMTJkjIm9DAFkzf7G4t5qeth.2JEYacMmp1t7sStKhZCZz28qz68e",
                idade :Math.floor(((new Date()-new Date(dado.dob.date))/ (1000 * 60 * 60 * 24))/360),
                dataNascimento:dado.dob.date

             }
             console.log(usuario)
             criarUsuario(usuario)
            return res.json(response.data)
        })
        .catch((erro)=>{console.log(erro)
        })
    
    }
    
}

async function criarUsuario (dados) {
    
    try {
        await Users.create({name: dados.name,email:dados.email,userName:dados.userName, foto:dados.foto,password: dados.password,picture:dados.picture,idade:dados.idade,dataNascimento:dados.dataNascimento})    
    } catch (error) {
        console.log(error)
    }

    
 }
module.exports = new UserRandom()




