import { initializeAuth, getAuth, } from "firebase/auth";
import firebaseApp from '../database.js'

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

        let idToken = req.body.sessiontoken
        console.log('getauth')
        console.log(auth)
        console.log('currentuser')
        adminAuth
        .verifyIdToken(idToken, false)
        .then((decodedToken) => {
        //const uid = decodedToken.uid;
        // ...
        console.log('a')
        return res.status(200).json({message: 'Authentiation ok'});
        next();
        })
        .catch((error) => {
        
            // Handle error
            console.log('b')
            return res.status(403).json({message: 'Authentiation failed'});
        });

        /*
        const token = req.headers['x-access-token'];
        if (!token) return res.status(403).json({message: 'No token provided'});

        const decoded = jwt.verify(token, config.SECRET);
        const user = await User.findById(decoded.id, {password: 0});

        if (!user) return res.status(403).json({message: 'Authentiation failed'});

        //console.log('user middleware ' + user);
        req.body.user = user;
        next();

        */
    } catch (error) {
        return res.status(401).json({message: 'Authentication failed'});
    }
}