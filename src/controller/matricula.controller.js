
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child, update, remove} from "firebase/database";
import firebaseApp from '../database.js';
// const UserController = require('../controller/user');
// import * as UserController from '';

const db = getDatabase();

export const storeMatricula = async function(req, res){
    try{
        let idAlumno = req.body.idalumno;
        let idCurso = req.body.idcurso
        let nombreAlumno = req.body.nombreAlumno
        let nombreCurso = req.body.nombreCurso
        console.log('matriculando')
        if ( (idAlumno == '' || idCurso == '') || (idAlumno == undefined || idCurso == undefined) ) {
            res.status(401).json({ message: "Algún campo está vacio" });
        } else {

            console.log(new Date())

            const matricula = ref(db, 'matricula')
            const newMatricula = push(matricula)
            set(newMatricula, {
                idalumno : idAlumno, 
                idcurso: idCurso,
                activa: true,
                fechainicio: new Date().toLocaleString(),
                fechafin: '26/05/2030',
                nombreAlumno: nombreAlumno,
                nombreCurso: nombreCurso
            })
            res.status(200).json({ message: "matricula añadida" });
        }
    
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }

}



export const indexMatricula = async function(req, res){
    try{
        let matricula = {};
        const dbRef = ref(getDatabase());
        let nombreAlumno = '';
        
        console.log(nombreAlumno);
        get(child(dbRef, 'matricula')).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                matricula = snapshot.val();
                
                // console.log(matricula);
                
                res.status(200).json({ message: "Devolviendo matricula", matricula: matricula });
            } else {
                console.log("No data available");
                res.status(200).json({ message: "No hay matricula disponibles actualmente", });
            }
        })
        for(var i in matricula){
            var idAlumno = matricula[i].idalumno;
            get(child(dbRef, 'users/'+ idAlumno)).then((snapshot2) => {
                console.log(idAlumno);
                if (snapshot2.exists()) {
                    //console.log(snapshot.val());
                    let usuario = snapshot2.val();
                    nombreAlumno= usuario.nombre;
                } else {
                    // console.log(snapshot2);
                    console.log("No data available");
                    nombreAlumno= 'No hay';
                }
            })
            // let nombreAlumno = UserController.getAlumnoById(i);

            console.log(nombreAlumno);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const getMatriculaById = async function(req, res){
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
}

export const getMatriculaByUser = async function(req, res){
    try{
        let id = req.params.userid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'matricula')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                let matricula = snapshot.val()
                let matriculas = []
                for(var i in matricula){
                    if (matricula[i].idalumno == id){
                        matriculas.push(matricula[i])
                    }
                }
                if(matriculas.length > 0){
                    res.status(200).json({ message: "Devolviendo matricula", matricula: matriculas });
                } else {
                    res.status(200).json({ message: "El usuario no tiene matriculas", });    
                }
            } else {
                console.log("No data available");
                res.status(200).json({ message: "El usuario no tiene matriculas", });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const updateMatricula = async function(req, res){
    try{

        let id = req.params.matriculaid;
        let idalumno = req.body.idalumno;
        let idcurso = req.body.idcurso;
        let activa = req.body.activa;
        let fechainicio = req.body.fechainicio;
        let fechafin = req.body.fechafin;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'matricula/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                const matricula = ref(db, 'matricula/'+id)
                update(matricula, {
                    idalumno: idalumno,
                    idcurso: idcurso,
                    activa: activa,
                    fechainicio: fechainicio,
                    fechafin: fechafin
                })
                res.status(200).json({ message: "Matricula actualizada", });
            } else {
                console.log("No data available");
                res.status(401).json({ message: "No se ha encontrado la matricula", });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const deleteMatricula = async function(req, res){
    try{
        let id = req.params.matriculaid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'matricula/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {

                const matricula = ref(db, 'matricula/'+id)
                remove(matricula)
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
}