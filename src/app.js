import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

import pkg from '../package.json'

const app = express()


//Middelwares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())

app.set('pkg', pkg)

app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    })
})


export default app