import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express();
/*
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyC-rjHLjxQ_2lyFWMISeQq8ReJa9U_6dFY",
    authDomain: "e-schools-1a842.firebaseapp.com",
    databaseURL: "https://e-schools-1a842-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "e-schools-1a842",
    storageBucket: "e-schools-1a842.appspot.com",
    messagingSenderId: "165316854923",
    appId: "1:165316854923:web:50c9b39772ede4f9ab808e",
    measurementId: "G-BH14SXQLYM"
  };

const firebaseApp = initializeApp(firebaseConfig);
*/
//const db = getFirestore(firebaseApp);

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js'
import cursoRoutes from './routes/curso.routes.js'
import matriculaRoutes from './routes/matricula.routes.js'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/curso', cursoRoutes);
app.use('/matricula', matriculaRoutes)

export {
    app,
} 