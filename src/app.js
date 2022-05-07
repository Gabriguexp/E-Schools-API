import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload';

const app = express();
//app.use(fileUpload());

app.use(fileUpload({
    createParentPath: true
}));

/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})
*/

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js'
import cursoRoutes from './routes/curso.routes.js'
import matriculaRoutes from './routes/matricula.routes.js'
import materialRoutes from './routes/material.routes.js'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/curso', cursoRoutes);
app.use('/matricula', matriculaRoutes)
app.use('/material', materialRoutes)

export default app