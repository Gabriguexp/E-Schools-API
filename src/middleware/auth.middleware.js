import { initializeAuth, getAuth, } from "firebase/auth";
import firebaseApp from '../database.js'
import { getDatabase, ref, get, child, } from "firebase/database";

const auth = initializeAuth(firebaseApp);

import admin from 'firebase-admin'
import dbData from "../e-schoolsadmin.js"
admin.initializeApp({
  credential: admin.credential.cert(dbData),
  databaseURL: "https://e-schools-1a842-default-rtdb.europe-west1.firebasedatabase.app"
});

const adminAuth = admin.auth()



export const verifyToken = async (req, res, next) => {
    try {
        let idToken = req.headers['x-access-token'];
        adminAuth
        .verifyIdToken(idToken, false)
        .then((decodedToken) => {
        console.log('averifytoken')
        next();
        })
        .catch((error) => {
            console.log('bverifytoken')
            return res.status(403).json({message: 'Authentiation failed'});
        });
    } catch (error) {
        return res.status(401).json({message: 'Authentication failed'});
    }
}

export const verifyProfesorToken = async (req, res, next) => {
    try {
        let idToken = req.headers['x-access-token'];
        adminAuth
        .verifyIdToken(idToken, false)
        .then((decodedToken) => {
        const uid = decodedToken.uid;
        // ...
        
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users/'+ uid)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                let usuario = snapshot.val()
                if (usuario.rol == 'Administrador'){
                    next()
                }else if(usuario.rol == 'profesor'){
                    let curso = req.body.curso
                    if (curso == undefined || curso == ''){
                        curso = req.params.cursoid
                    }
                    for(let i in usuario.cursos){
                        if( usuario.cursos[i].curso == 'asdf'){
                            next()
                            return
                        }
                        return res.status(400).json({ message: "No eres profesor de este curso", });        
                    }
                }else {
                    return res.status(400).json({ message: "Ruta solo disponible para profesor", });    
                }
                
            } else {
                console.log("No data available");
                return res.status(400).json({ message: "No se ha encontrado el usuario", });
            }
        })
        })
        .catch((error) => {
        
            // Handle error
            console.log('b')
            return res.status(403).json({message: 'Authentiation failed'});
        });
    } catch (error) {
        return res.status(401).json({message: 'Authentication failed'});
    }
}


export const verifyAdminToken = async (req, res, next) => {
    try {
        console.log('verificando admintoken')
        let idToken = req.headers['x-access-token'];
        adminAuth
        .verifyIdToken(idToken, false)
        .then((decodedToken) => {
        const uid = decodedToken.uid;
        // ...
        
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users/'+ uid)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                if (snapshot.val().rol == 'Administrador'){
                    next()
                } else {
                    return res.status(400).json({ message: "Ruta solo disponible para administrador", });
                }
                
            } else {
                console.log("No data available");
                return res.status(200).json({ message: "No se ha encontrado al usuario", });
            }
        })
        })
        .catch((error) => {
        
            // Handle error
            console.log('b')
            console.log(error)
            return res.status(403).json({message: 'Admin no valido'});
        });
    } catch (error) {
        return res.status(401).json({message: 'Authentication failed'});
    }
}
