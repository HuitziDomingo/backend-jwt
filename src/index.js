import mongoose from 'mongoose'
import { config as dotenv } from 'dotenv'

dotenv()

import app from './app'

app.listen(process.env.PORT, console.log("corriendo server en el puerto: " + process.env.PORT))


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'jwt' })
    .then(() => console.log("Base de datos conectada"))
    .catch(err => console.log(err))