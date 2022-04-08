import express from 'express';
import bodyParser from 'body-parser'

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', userRoutes);

export {
    app,
  //  firebaseApp
} 