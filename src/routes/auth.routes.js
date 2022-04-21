import {Router} from 'express';

const router = Router();

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { async } from '@firebase/util';
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
const auth = initializeAuth(firebaseApp);
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const database = getDatabase();


//import * as userController from '../controller/user.controller';

//router.get('/', userController.home)

router.post('/login', async function(req, res){
    try {
        console.log(req.body)
        let email = req.body.email;
        let password = req.body.password;
        await signInWithEmailAndPassword(auth, email, password).then(
          async (result) => {
              console.log(result)
              const auth = getAuth();
              onAuthStateChanged(auth, (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const uid = user.uid;
                  console.log('uid: '+ uid)
                  // ...
                } else {
                  // User is signed out
                  // ...
                }
              });

              res.status(200).json({ message: "Inicio de sesión correcto" });
          },
          function (error) {
            console.log(error);
            res.status(401).json({ message: "Datos de inicio de sesión incorrectos" });
          }
        );
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
})



router.post('/register', async function(req, res){
    try {
        let email = req.body.email;
        let password = req.body.password;
        let nombre = req.body.nombre;
        let apellidos = req.body.apellidos;
        //Comprobar datos de register y si esta todo ok almacenarlo.

        if (emailRegex.test(email) && password.length >=6 && nombre != '' && apellidos != ''){
          await createUserWithEmailAndPassword(auth, email, password).then(
            async (result) => {
                let userId = result.user.uid
                const db = getDatabase();
                set(ref(db, 'users/' + userId), {
                  nombre : nombre, 
                  apellidos : apellidos,
                  email: email,
                  rol: 'estudiante',
                });

                res.status(200).json({ message: "Registro correcto" });
            },
            function (error) {
              console.log(error);
              res.status(401).json({ message: "Registro incorrecto" });
            }
          );
        } else {
            res.status(401).json({ message: "Faltan datos en el registro" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
})



router.post('/registerProfesor', async function(req, res){
  try {
      let email = req.body.email;
      let password = req.body.password;
      let rePass = req.body.repassword
      let nombre = req.body.nombre;
      let apellidos = req.body.apellidos;
      let register = false
      //Comprobar datos de register y si esta todo ok almacenarlo.

      if (password != repassword){
        res.status(401).json({ message: "Las contraseñas no coinciden" });
      }
      if (emailRegex.test(email) && password.length >=6 && nombre != '' && apellidos != ''){
        await createUserWithEmailAndPassword(auth, email, password).then(
          async (result) => {
              let userId = result.user.uid
              const db = getDatabase();
              set(ref(db, 'users/' + userId), {
                nombre : nombre, 
                apellidos : apellidos,
                email: email,
                rol: 'profesor',
              });

              res.status(200).json({ message: "Registro correcto" });
          },
          function (error) {
            console.log(error);
            res.status(401).json({ message: "Registro incorrecto" });
          }
        );
      }

  } catch (error) {
      console.log(error);
      res.status(400).json({ message: "An error occured" });
  }
})
export default router;
