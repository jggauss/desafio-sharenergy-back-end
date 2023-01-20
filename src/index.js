const app = require('./app')
const Loaders = require('./database/index')

Loaders.start()
app.listen(process.env.PORT,() => console.log("Servidor rodando na porta : "+process.env.PORT))