import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express();

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