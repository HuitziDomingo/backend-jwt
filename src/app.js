import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

import pkg from '../package.json'

import { createRoles } from './libs/initialSetup'

import products from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

const app = express()
createRoles()


//Middelwares
app.use(cors())
app.use(express.json())//Ver los datos en consola como JSON
app.use(morgan('dev'))//Ver las peticiones en consola
app.use(helmet())

app.set('pkg', pkg)


//Rutas y endpoints
app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    })
})

app.use('/api/products', products)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app