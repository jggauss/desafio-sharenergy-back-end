const app = require('./app')
const Loaders = require('./database/index')

Loaders.start()
app.listen(8082,() => console.log("Servidor rodando na porta 8082"))