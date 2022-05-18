import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child, update, remove} from "firebase/database";
import firebaseApp from '../database.js';

const db = getDatabase();

export const storeCurso = async function(req, res){
    try{
        let nombre = req.body.nombre;
        let descripcion = req.body.descripcion
        let precio = req.body.precio
        let priceid = req.body.priceid
        if (nombre == '' && descripcion == '' && precio == '') {
            res.status(401).json({ message: "Algún campo está vacio" });
        } else {

            const cursos = ref(db, 'curso')
            const newCurso = push(cursos)
            set(newCurso, {
                nombre : nombre, 
                descripcion : descripcion,
                precio: precio,
                priceid: priceid
            })
            res.status(200).json({ message: "Curso añadido" });
        }
    
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }

}

export const indexCurso = async function(req, res){
    try{
        let cursos = {}
        let cursosFormatted = []
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                cursos = snapshot.val()
                for(var i in cursos){                    
                    cursosFormatted.push([i, cursos[i]])
                }
                res.status(200).json({ message: "Devolviendo cursos", cursos: cursosFormatted });
            } else {
                console.log("No data available");
                res.status(200).json({ message: "No hay cursos disponibles actualmente", });
            }
        })

        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const getCursoById = async function(req, res){
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

export const updateCurso = async function(req, res){
    try{
        let nombre = req.body.nombre;
        let descripcion = req.body.descripcion
        let precio = req.body.precio
        let priceid = req.body.priceid
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
                    priceid: priceid
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

export const deleteCurso = async function(req, res){
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

export const verifyName = async function(req, res){
    try{
        let cursos = {}
        let nombre = req.body.nombre
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                cursos = snapshot.val()
                for(var i in cursos){
                    if(nombre == cursos[i].nombre){
                        return res.status(400).json({ message: "Nombre del curso disponible", disponible: true });
                    }
                }
                return res.status(400).json({ message: "Nombre del curso no disponible", disponible: false });
            } else {
                console.log("No data available");
                res.status(400).json({ message: "No hay cursos disponibles actualmente", });
            }
        })

        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}