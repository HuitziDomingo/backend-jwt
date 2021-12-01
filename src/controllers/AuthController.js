import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'

export const signUp = async (req, res) => {
    let { username, email, password, roles } = req.body

    let newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })
    let savedUser = await newUser.save()
    let token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400 //Esto esta en segundos y son 24 horas
    })
    res.json({ token })
}

export const signIn = async (req, res) => {
    res.json({ signIn: "Iniciar sesion" })

}