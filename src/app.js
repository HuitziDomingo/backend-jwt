import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

import pkg from '../package.json'

import products from '../src/routes/products.routes'

const app = express()


//Middelwares
app.use(cors())
app.use(express.json())//Ver los datos en consola como JSON
app.use(morgan('dev'))
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

app.use('/products',products)

export default app