import {Router} from 'express';

const router = Router();
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child, update, remove} from "firebase/database";
import firebaseApp from '../database.js';

const db = getDatabase();


router.post('/store', async function(req, res){
    try{
        let idAlumno = req.body.idalumno;
        let idCurso = req.body.idcurso
        
        if (idAlumno == '' && idCurso == '' ) {
            res.status(401).json({ message: "Algún campo está vacio" });
        } else {

            

            const matricula = ref(db, 'matricula')
            const newMatricula = push(matricula)
            set(newMatricula, {
                idalumno : idAlumno, 
                idcurso: idCurso,
                activa: true,
                fechainicio: new Date(),
                fechafin: '26/05/2030'
            })
            res.status(200).json({ message: "matricula añadido" });
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
        get(child(dbRef, 'matricula')).then((snapshot) => {
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

router.get('/:matriculaid', async function(req, res){
    try{
        let id = req.params.matriculaid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'matricula/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                let matricula = snapshot.val()
                res.status(200).json({ message: "Devolviendo matricula", matricula: matricula });
            } else {
                console.log("No data available");
                res.status(200).json({ message: "No se ha encontrado la matricula", });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
})

router.put('/:matriculaid', async function(req, res){
    try{

        let id = req.params.matriculaid;
        let activa = req.body.activa
        let fechainicio = req.body.fechainicio
        let fechafin = req.body.fechafin
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'matricula/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                const matricula = ref(db, 'matricula/'+id)
                update(matricula, {
                    activa: activa,
                    fechainicio: fechainicio,
                    fechafin: fechafin
                })
                res.status(200).json({ message: "matricula actualizada", });
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

router.delete('/:matriculaid', async function(req, res){
    try{
        let id = req.params.matriculaid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'matricula/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {

                const matricula = ref(db, 'matricula/'+id)
                remove(curso)
                res.status(200).json({ message: "Matricula borrado.", });

            } else {
                console.log("No data available");
                res.status(401).json({ message: "No se ha encontrado la matricula", });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
})

export default router;
