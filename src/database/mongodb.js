const mongoose = require('mongoose')


async function startDB(){
    mongoose.set("strictQuery", true);
    
    await mongoose.connect("mongodb+srv://"+process.env.MONGODBACCESS)
    
}
module.exports =startDB