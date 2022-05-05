import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child, update, remove} from "firebase/database";
import firebaseApp from '../database.js';

const db = getDatabase();

export const storeExamen = async function(req, res){
    try{
        let titulo = req.body.titulo;
        let preguntas = req.body.preguntas;
        let data = req.body.data;
        let visible = req.body.visible;
        let curso = req.body.curso;
        
        if (titulo == '' && preguntas == '' && data == '' && visible == '' && curso == '') {
            res.status(401).json({ message: "Algún campo está vacio" });
        } else {
            const examenes = ref(db, 'curso/'+ curso +'/examen')
            const newExamen = push(examenes)
            set(newExamen, {
                nombre : nombre, 
                preguntas : preguntas,
                data: data,
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
        let id = req.body.idcurso
        let examenes = {}
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ id +'/examen')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                examen = snapshot.val()
                res.status(200).json({ message: "Devolviendo examenes", examenes: examen });
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
}

export const updateExamen = async function(req, res){
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