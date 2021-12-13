//Confirmar que un usuario nos envie su token
import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token']

        if (!token) return res.status(403).json({ message: "No hay token." })
        let decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id

        let user = await User.findById(req.userId, { password: 0 })
        console.log(user)
        if (!user) return res.status(404).json({ message: "El usuario no fue encontrado." })

        next()
    } catch (error) {
        return res.status(401).json({ message: 'Acceso no autorizado' })
    }
}

export const isModerator = async (req, res, next) => {

}

export const isAdmin = (req, res, next) => {

}