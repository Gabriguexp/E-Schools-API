import admin from 'firebase-admin'
import dbData from "./e-schoolsadmin.js"
admin.initializeApp({
  credential: admin.credential.cert(dbData),
  databaseURL: "https://e-schools-1a842-default-rtdb.europe-west1.firebasedatabase.app"
}, 'adminauth');


const adminAuth = admin.auth()
export default adminAuth