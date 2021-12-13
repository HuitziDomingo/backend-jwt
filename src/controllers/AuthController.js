import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

export const signUp = async (req, res) => {
    let { username, email, password, roles } = req.body

    let newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles) {
        let foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(x => x._id)
    } else {
        let role = await Role.findOne({ name: "user" })
        newUser.roles = [role._id]
    }

    let savedUser = await newUser.save()
   
    let token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400 //Esto esta en segundos y son 24 horas
    })
    res.json({ token })
}

export const signIn = async (req, res) => {
    let userFound = await User.findOne({ email: req.body.email }).populate("roles")//Recibir el JSON completo de roles

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

    //Validar que al iniiar sesin el usuario exista en BD
    let matchPassword = await User.comparePassword(req.body.password, userFound.password)
    if (!matchPassword) return res.status(401).json({ token: null, message: 'Clave invalida.' })
    let token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })
    res.json({ token })
}