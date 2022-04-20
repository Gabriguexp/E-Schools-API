import {Router} from 'express';

const router = Router();
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child, update, remove} from "firebase/database";

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
const db = getDatabase();
router.post('/store', async function(req, res){
    try{
        let nombre = req.body.nombre;
        let descripcion = req.body.descripcion
        let precio = req.body.precio
        if (nombre == '' && descripcion == '' && precio == '') {
            res.status(401).json({ message: "Algún campo está vacio" });
        } else {

            const cursos = ref(db, 'curso')
            const newCurso = push(cursos)
            set(newCurso, {
                nombre : nombre, 
                descripcion : descripcion,
                precio: precio,
            })
            res.status(200).json({ message: "Curso añadido" });
        }
    
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }

})

router.get('/index', async function(req, res){
    try{
        let cursos = {}
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                cursos = snapshot.val()
                res.status(200).json({ message: "Devolviendo cursos", cursos: cursos });
            } else {
                console.log("No data available");
                res.status(200).json({ message: "No hay cursos disponibles actualmente", });
            }
        })

        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
})

router.get('/:cursoid', async function(req, res){
    try{
        let id = req.params.cursoid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                let curso = snapshot.val()
                res.status(200).json({ message: "Devolviendo curso", curso: curso });
            } else {
                console.log("No data available");
                res.status(200).json({ message: "No se ha encontrado el curso", });
            }
        })



        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
})

router.put('/:cursoid', async function(req, res){
    try{
        let nombre = req.body.nombre;
        let descripcion = req.body.descripcion
        let precio = req.body.precio
        let id = req.params.cursoid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                
                

                const curso = ref(db, 'curso/'+id)
                
                update(curso, {
                    nombre : nombre, 
                    descripcion : descripcion,
                    precio: precio,
                })

                res.status(200).json({ message: "curso actualizado", });
            } else {
                console.log("No data available");
                res.status(401).json({ message: "No se ha encontrado el curso", });
            }
        })



        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
})

router.delete('/:cursoid', async function(req, res){
    try{
        let id = req.params.cursoid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {

                const curso = ref(db, 'curso/'+id)
                remove(curso)
                res.status(200).json({ message: "Curso borrado.", });

            } else {
                console.log("No data available");
                res.status(401).json({ message: "No se ha encontrado el curso", });
            }
        })



        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
})

export default router;
