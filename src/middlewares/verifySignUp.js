import { ROLES } from '../models/Role'
import User from '../models/User'

export const checkRolesExisted = (req, res, next) => {
    if (req.body.role) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(404).json({
                    message: `ROLE ${req.body.roles[i]} no existe`
                })
            }
        }
    }
    next()
}

export const checkDuplicateUserNameOrEmail = async (req, res, next) => {
    let user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).json({ message: 'El numero ya existe' })

    let email = await User.findOne({ email: req.body.email })
    if (email) return res.send(400).json({ message: 'El email ya existe' })

    next()
}