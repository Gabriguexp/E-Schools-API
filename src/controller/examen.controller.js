import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child, update, remove} from "firebase/database";
import firebaseApp from '../database.js';

const db = getDatabase();

export const storeExamen = async function(req, res){
    try{
        let titulo = req.body.titulo;
        let preguntas = req.body.preguntas;
        let visible = req.body.visible;
        let curso = req.body.curso;
        
        if (titulo == '' && preguntas == '' && visible == '' && curso == '') {
            res.status(401).json({ message: "Algún campo está vacio" });
        } else {
            const examenes = ref(db, 'curso/'+ curso +'/examen')
            const newExamen = push(examenes)
            set(newExamen, {
                titulo : titulo, 
                preguntas : preguntas,
                visible: visible,
            })
            res.status(200).json({ message: "Examen añadido" });
        }
    
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }

}

export const indexExamen = async function(req, res){
    try{
        let id = req.body.idcurso;
        let examen = {};
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ id +'/examen')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                examen = snapshot.val()
                res.status(200).json({ message: "Devolviendo examenes", examen: examen });
            } else {
                console.log("No data available");
                res.status(200).json({ message: "No hay examenes disponibles actualmente para este curso", });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const getExamenById = async function(req, res){
    try{
        let id = req.params.examenid;
        let idcurso = req.params.cursoid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ idcurso +'/examen/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                let examen = snapshot.val()
                res.status(200).json({ message: "Devolviendo examen", examen: examen });
            } else {
                console.log("No data available");
                res.status(200).json({ message: "No se ha encontrado el examen", idcurso: idcurso});
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const updateExamen = async function(req, res){
    try{
        let id = req.params.examenid;
        let idcurso = req.params.cursoid;
        
        let titulo = req.body.titulo;
        let preguntas = req.body.preguntas;
        let visible = req.body.visible;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ idcurso +'/examen/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                const curso = ref(db, 'curso/'+ idcurso +'/examen/'+ id)
                
                update(curso, {
                    titulo : titulo, 
                    preguntas : preguntas,
                    visible: visible,
                })

                res.status(200).json({ message: "examen actualizado", });
            } else {
                console.log("No data available");
                res.status(401).json({ message: "No se ha encontrado el examen", });
            }
        })



        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const deleteExamen = async function(req, res){
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
}