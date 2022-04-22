import { initializeApp } from "firebase/app";
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

export default firebaseApp