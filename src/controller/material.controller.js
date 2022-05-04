import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child, update, remove} from "firebase/database";
import firebaseApp from '../database.js';

const db = getDatabase();

export const storeMaterial = async function(req, res){
    try{
        let nombre = req.body.nombre;
        let tipo = req.body.tipo;
        let data = req.body.data;
        let visible = req.body.visible;
        let curso = req.body.curso;

        if (nombre == '' && descripcion == '' && data == '' && visible == '' && curso == '') {
            res.status(401).json({ message: "Algún campo está vacio" });
        } else {
            const materiales = ref(db, 'curso/'+ curso +'/material')
            const newMaterial = push(materiales)
            set(newMaterial, {
                nombre : nombre, 
                tipo : tipo,
                data: data,
                visible: visible,
            })
            res.status(200).json({ message: "Material añadido" });
        }
    
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }

}

export const indexMaterial = async function(req, res){
    try{
        let id = req.body.idcurso
        let materiales = {}
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ id +'/material')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                material = snapshot.val()
                res.status(200).json({ message: "Devolviendo materiales", materiales: material });
            } else {
                console.log("No data available");
                res.status(200).json({ message: "No hay materiales disponibles actualmente para este curso", });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const getMaterialById = async function(req, res){
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

export const updateMaterial = async function(req, res){
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

export const deleteMaterial = async function(req, res){
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