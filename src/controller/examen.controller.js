import { async } from "@firebase/util";
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
                res.status(200).json({ message: "No se ha encontrado el examen", id: id});
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

// export const deleteExamen = async function(req, res){
//     try{
//         let id = req.params.cursoid;
//         const dbRef = ref(getDatabase());
//         get(child(dbRef, 'curso/'+ id)).then((snapshot) => {
//             if (snapshot.exists()) {

//                 const curso = ref(db, 'curso/'+id)
//                 remove(curso)
//                 res.status(200).json({ message: "Curso borrado.", });

//             } else {
//                 console.log("No data available");
//                 res.status(401).json({ message: "No se ha encontrado el curso", });
//             }
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: "An error occured" });
//     }
// }

export const checkUploadedExamen = async function(req, res){
    try{
        let examen = req.params.examenid
        let userid = req.params.userid
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users/' + userid +'/realizado/'+ examen)).then((snapshot) => {
            if (snapshot.exists()) {
                
                let nota = snapshot.val().nota
                let comentario = snapshot.val().comentario
                res.status(200).json({ message: "examen ya realizada", realizado: true, nota: nota, comentario: comentario});
            } else {
                console.log("No data available for good ");
                res.status(200).json({ message: "examen no realizada", realizado: false });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }

}

export const uploadExamen = async function(req, res){
    try{
        let preguntasNuevas = req.body.preguntasNuevas;
        let preguntas = req.body.preguntas;
        let userid = req.body.user;
        let examen = req.body.examen;

        let nota= 0;
        let longitudPregunta = preguntas.length;
        let multiplo = 10 / longitudPregunta;

        console.log('examen: ' + examen)
        console.log('preguntasNuevas: ' + preguntasNuevas)
        for(let i=0; i<longitudPregunta; i++){
            console.log(multiplo);
            if(preguntasNuevas[i].solucion == -1){
                nota += 0;
            }else if(preguntas[i].solucion == preguntasNuevas[i].solucion){
                nota += multiplo;
            }else{
                nota -= multiplo;
            }
        }
        if(nota < 0){
            nota=0;
        }else{
            Math.round(nota * 100) / 100 ;
        }
        set(ref(db, 'users/' + userid + '/realizado/' + examen), {
            preguntasNuevas : preguntasNuevas,
            nota: nota,
            comentario : '',
        })
        res.status(200).json({ message: "Examen realizado" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}