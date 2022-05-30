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
        //console.log(error);
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
                ////console.log(snapshot.val());
                examen = snapshot.val()
                res.status(200).json({ message: "Devolviendo examenes", examen: examen });
            } else {
                //console.log("No data available");
                res.status(200).json({ message: "No hay examenes disponibles actualmente para este curso", });
            }
        })
    } catch (error) {
        //console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const getExamenById = async function(req, res){
    try{
        let id = req.params.examenid;
        let idcurso = req.params.cursoid;
        //console.log('id:' + id)
        //console.log('idcurso:' + idcurso)
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ idcurso +'/examen/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                ////console.log(snapshot.val());
                let examen = snapshot.val()
                //console.log("df");
                res.status(200).json({ message: "Devolviendo examen", examen: examen });
            } else {
                //console.log("No data available + df");
                res.status(200).json({ message: "No se ha encontrado el examen", id: id});
            }
        })
    } catch (error) {
        //console.log(error);
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
                ////console.log(snapshot.val());
                const curso = ref(db, 'curso/'+ idcurso +'/examen/'+ id)
                
                update(curso, {
                    titulo : titulo, 
                    preguntas : preguntas,
                    visible: visible,
                })

                res.status(200).json({ message: "examen actualizado", });
            } else {
                //console.log("No data available");
                res.status(401).json({ message: "No se ha encontrado el examen", });
            }
        })



        
    } catch (error) {
        //console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const deleteExamen = async function(req, res){
    try{
        //console.log('aslopnkf');
        let cursoid = req.body.curso;
        let examenid = req.body.examenid;
        //console.log('cursoid'+ cursoid)
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ cursoid+'/examen/'+ examenid)).then((snapshot) => {
            
            if (snapshot.exists()) {
                //console.log('DELETE')
                remove(ref(db, 'curso/'+ cursoid+'/examen/'+ examenid))
                res.status(200).json({ message: "Examen borrado.", });

            } else {
                //console.log("No data available");
                res.status(401).json({ message: "No se ha encontrado el examen", });
            }
        })
        
    } catch (error) {
        //console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

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
                //console.log("No data available for good ");
                res.status(200).json({ message: "examen no realizada", realizado: false });
            }
        })
    } catch (error) {
        //console.log(error);
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

        //console.log('examen: ' + examen)
        //console.log('preguntasNuevas: ' + preguntasNuevas)
        for(let i=0; i<longitudPregunta; i++){
            //console.log(multiplo);
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
        //console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const uploadComentario = async function(req, res){
    try{
        let comentario = req.body.comentario;
        let examen = req.body.examen;
        let userid = req.body.iduser;


        //console.log('examen: ' + examen)
        //console.log('jkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalksjkabsdkjabslkcfjnaslkdncalks');
        const examenRealizado = ref(db, 'users/' + userid + '/realizado/' + examen);
                
        update(examenRealizado, {
            comentario : comentario,
        })
        res.status(200).json({ message: "Comentario guardado" });
    } catch (error) {
        //console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const getExamenesRealizados =  async function(req, res){
    try{
        //console.log('a s d f')
        let examenid = req.params.idexamen
        
        let usuarios = {}
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                usuarios = snapshot.val()
                let estudiantes = []
                for(var i in usuarios){   
                    if(usuarios[i].realizado != undefined){
                        if(usuarios[i].realizado[examenid] != undefined){
                            //console.log('-----------')
                            //console.log(usuarios[i].realizado[examenid])
                            estudiantes.push([i, usuarios[i]])
                            //console.log('-----------')   
                        }
                    }
                }
                for(let i = 0; i < usuarios.length; i++){
                    //console.log('-----')
                    //console.log(i)
                    //console.log('-----')
                }   
                
                res.status(200).json({ message: "Devolviendo usuarios que han realizado el examen", usuarios: estudiantes });
            } else {
                //console.log("No data available");
                res.status(200).json({ message: "No hay usuarios actualmente", });
            }
        })
    }catch (error) {
        //console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const getExamenesNoRealizados =  async function(req, res){
    try{
        //console.log('a s d')
        let cursoid = req.params.idcurso
        let examenid = req.params.idexamen
        
        let usuarios = []
        let usuarios2 = {}
        let matriculas = {}
        let estudiantes = []
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'matricula')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                matriculas = snapshot.val()
                for(var i in matriculas){   
                    if(matriculas[i].idcurso == cursoid){
                        //console.log('-----------')
                        //console.log(matriculas[i].idcurso)
                        usuarios.push(matriculas[i].idalumno)
                        //console.log('-----------')   
                    }
                }
            }
        })
        let booleano = false;
        get(child(dbRef, 'users')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                usuarios2 = snapshot.val()
                
                for(var i in usuarios2){   
                    for(var j in usuarios){
                        booleano = false;
                        
                        if(usuarios[j]==i){
                            //console.log(' ajsnd' + usuarios2[i].realizado);
                            if(usuarios2[i].realizado == undefined){
                                //console.log('-----------')
                                for(var l in estudiantes){
                                    if(estudiantes[l][0]== i){
                                        booleano = true;
                                    }
                                }
                                //console.log(booleano);
                                if(booleano == false){
                                    estudiantes.push([i, usuarios2[i]])
                                }
                                //console.log('-----------')   
                            }else if(usuarios2[i].realizado[examenid] == '' || usuarios2[i].realizado[examenid] == undefined ){
                                //console.log(examenid);
                                //console.log(usuarios2[i].realizado[examenid])
                                //console.log('-----------')
                                
                                for(var l in estudiantes){
                                    if(estudiantes[l][0]== i){
                                        booleano = true;
                                    }
                                }
                                //console.log(booleano);
                                if(booleano == false){
                                    estudiantes.push([i, usuarios2[i]])
                                }
                                //console.log('-----------')   
                            }
                        }
                    }
                }
                for(let i = 0; i < usuarios2.length; i++){
                    //console.log('-----')
                    //console.log(i)
                    //console.log('-----')
                }   
                
                res.status(200).json({ message: "Devolviendo usuarios que no han realizado el examen", usuarios: estudiantes });
            } else {
                //console.log("No data available");
                res.status(200).json({ message: "Todos los usuarios han realizado el examen", });
            }
        })
    }catch (error) {
        //console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}