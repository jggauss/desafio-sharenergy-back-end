const Users = require('../Models/User.js')


class ImageController {
    async create(req, res) {
        const { id } = req.params
        const file = req.file

        if (req.file) {
            const user = await Users.findById(id)
            const updateUser = await user.updateOne({foto:file.filename})
            return res.status(200).json(user)
        }
        return res.status(401).json("Erro ao adicionar a foto")
    }
}
module.exports = new ImageController()
