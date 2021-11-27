import mongoose from 'mongoose'
import {config as dotenv} from 'dotenv'

dotenv()

import app from './app'

app.listen(3000, console.log("corriendo server en el puerto 3000"))


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'jwt' })
.then(() => console.log("Base de datos conectada"))
.catch(err => console.log(err))