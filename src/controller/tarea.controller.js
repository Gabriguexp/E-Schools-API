
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child, update, remove} from "firebase/database";
import firebaseApp from '../database.js';
// const UserController = require('../controller/user');
// import * as UserController from '';

const db = getDatabase();


export const getTareasEntregadas =  async function(req, res){
    try{
        console.log('a s d f')
        let idtarea = req.params.idtarea
        
        let usuarios = {}
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                usuarios = snapshot.val()
                let estudiantes = []
                for(var i in usuarios){   
                    if(usuarios[i].entrega != undefined){
                        if(usuarios[i].entrega[idtarea] != undefined){
                            console.log('-----------')
                            console.log(usuarios[i].entrega[idtarea])
                            estudiantes.push([i, usuarios[i]])
                            console.log('-----------')   
                        }       
                    }
                }
                for(let i = 0; i < usuarios.length; i++){
                    console.log('-----')
                    console.log(i)
                    console.log('-----')
                }   
                
                res.status(200).json({ message: "Devolviendo usuarios que han entregado la tarea", usuarios: estudiantes });
            } else {
                console.log("No data available");
                res.status(200).json({ message: "No hay usuarios actualmente", });
            }
        })
    }catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const calificarTarea =  async function(req, res){
    try{
        console.log('a s d f')
        let idtarea = req.body.idtarea
        let iduser = req.body.iduser
        let nota = req.body.nota
        let comentario = req.body.comentario
        const dbRef = ref(getDatabase());
        
        get(child(dbRef, 'users/'+ iduser+'/entrega/'+ idtarea)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                const entrega = ref(db, 'users/'+ iduser+'/entrega/'+ idtarea)
                update(entrega, {
                    nota : nota, 
                    comentario : comentario,
                })
                res.status(200).json({ message: "Calificacion hecha", });
            } else {
                console.log("No data available");
                res.status(401).json({ message: "No se ha encontrado la entrega", });
            }
        })
       
    }catch (error) {
        console.log('error')
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const uploadTarea = async function(req, res){
    try{
        let tarea = req.body.tarea
        let userid = req.body.userid
        let file = req.files.entrega;

        file.mv('public/public/usuarios/'+ userid +'/'+ tarea + '/' +file.name, true, function(err) {
            console.log('moving file')
            if (err){
                console.log('error subiendo archivo')
                console.log(err)
                return res.status(500).send(err);
            }

        })

        console.log('tarea: ' + tarea)
        console.log('file: ' + file.name)
        set(ref(db, 'users/' + userid + '/entrega/' + tarea), {
            tarea : tarea, 
            file: file.name,
            nota: -1,
            comentario : '',
        })
        res.status(200).json({ message: "Tarea subida" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}
