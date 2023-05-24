const User = require("../../../../database/models/user.model");
const dotenv = require("dotenv");
dotenv.config();

// delete user
const deleteUser = async(req, res) => { 
    const {id} = req.params;
    try {
        const user = await User.findByPk(id)
        if(!user){
            return res.status(404).json({ msg: 'User not found' })
        }
        user.is_active = false
        await user.save();
        return res.json({ mensaje: 'Record deleted successfully' });
    } catch (error) {
        return res.status(403).json({ msg: error.message })
    }
}


module.exports = deleteUser;