const multer = require('multer')

module.exports = multer({
    storage:multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,'./src/public/images/user')
        },
        filename: function(req,file,cb){
            const uniqueSufix = '-' + Date.now() + file.originalname
            cb(null,file.fieldname + uniqueSufix)
        }
    })
})