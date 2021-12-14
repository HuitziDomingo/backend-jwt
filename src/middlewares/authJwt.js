//Confirmar que un usuario nos envie su token
import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

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
    let user = await User.findById(req.userId)//Obtenemos el usuario que ya esta verificado
    let roles = await Role.find({ _id: { $in: user.roles } })
    console.log(roles)

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next()
            return;
        }
    }

    return res.status(403).json({ message: "Requiere moderador role" })
}

export const isAdmin = async (req, res, next) => {
    let user = await User.findById(req.userId)//Obtenemos el usuario que ya esta verificado
    let roles = await Role.find({ _id: { $in: user.roles } })
    console.log(roles)

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next()
            return;
        }
    }

    return res.status(403).json({ message: "Requiere admin role" })
}