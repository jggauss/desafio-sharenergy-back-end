const mongoose = require('mongoose')


async function startDB(){
    mongoose.set("strictQuery", true);
    
    await mongoose.connect("mongodb+srv://"+"jggauss:452319@cluster0.zl5cykd.mongodb.net/test")
    
}
module.exports =startDB