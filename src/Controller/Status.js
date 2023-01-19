const apiHTTPCats = require('../../ConfigApi/ConfigApiHttpCats')
class Status {
    async buscaStatus(req,res){
        const {status} = req.params
        await apiHTTPCats.get('/'+102+".jpg")
        .then((response)=>{
            return response
        })
        .catch((erro)=>{console.log(erro)})
    }

}
module.exports = new Status