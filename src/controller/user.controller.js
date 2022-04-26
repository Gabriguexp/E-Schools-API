import { getDatabase, ref, set, push, get, child, update, remove} from "firebase/database";
import { initializeAuth, createUserWithEmailAndPassword, } from "firebase/auth";
import firebaseApp from '../database.js'

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const db = getDatabase();
const auth = initializeAuth(firebaseApp);

export const storeUser = async(req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let nombre = req.body.nombre;
        let apellidos = req.body.apellidos;
        let rol = req.body.rol
        //Comprobar datos de register y si esta todo ok almacenarlo.

        if (emailRegex.test(email) && password.length >=6 && nombre != '' && apellidos != '' ){
            if (rol == 'alumno' || rol == 'profesor'){
                await createUserWithEmailAndPassword(auth, email, password).then(
                    async (result) => {
                        let userId = result.user.uid
                        const db = getDatabase();
                        set(ref(db, 'users/' + userId), {
                          nombre : nombre, 
                          apellidos : apellidos,
                          email: email,
                          rol: rol,
                        });
        
                        res.status(200).json({ message: "Usuario añadido" });
                    },
                    function (error) {
                      console.log(error);
                      res.status(401).json({ message: "Error al añadir el usuario" });
                    }
                );
            } else {
                res.status(401).json({ message: "El rol solo puede ser alumno o profesor" });
            }

        } else {
            res.status(401).json({ message: "Faltan datos del usuario" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const indexUsers = async function(req, res){
    try{
        let usuarios = {}
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                usuarios = snapshot.val()
                res.status(200).json({ message: "Devolviendo usuarios", usuarios: usuarios });
            } else {
                console.log("No data available");
                res.status(200).json({ message: "No hay usuarios actualmente", });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const getAlumnos =  async function(req, res){
    try{
        let usuarios = {}
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                usuarios = snapshot.val()
                let estudiantes = []
                for(var i in usuarios){                    
                    if (usuarios[i].rol == 'alumno'){
                        estudiantes.push([i, usuarios[i]])
                    }
                }

                for(let i = 0; i < usuarios.length; i++){
                    console.log('-----')
                    console.log(i)
                    console.log('-----')
                }
                
                res.status(200).json({ message: "Devolviendo usuarios", usuarios: estudiantes });
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

export const getProfesores = async function(req, res){
    try{
        let usuarios = {}
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users')).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                usuarios = snapshot.val()
                let profesores = []
                for(var i in usuarios){                    
                    if (usuarios[i].rol == 'profesor'){
                        profesores.push([i, usuarios[i]])
                    }
                }

                for(let i = 0; i < usuarios.length; i++){
                    console.log('-----')
                    console.log(i)
                    console.log('-----')
                }
                
                res.status(200).json({ message: "Devolviendo usuarios", usuarios: profesores });
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

export const getUserById = async function(req, res){
    try{
        let id = req.params.userid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                let usuario = snapshot.val()
                res.status(200).json({ message: "Devolviendo usuario", usuario: usuario });
            } else {
                console.log("No data available generico");
                res.status(200).json({ message: "No se ha encontrado el usuario", });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const updateUser =  async function(req, res){
    try{
        //let email = req.body.email;
        /*let password = req.body.password;*/
        let nombre = req.body.nombre;
        let apellidos = req.body.apellidos;
        let rol = req.body.rol
        let id = req.params.userid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                const curso = ref(db, 'users/'+id)
                update(curso, {
                    nombre : nombre, 
                    apellidos : apellidos,
                    rol: rol,
                })
                res.status(200).json({ message: "usuario actualizado", });
            } else {
                console.log("No data available");
                res.status(401).json({ message: "No se ha encontrado al usuario", });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}


/*

export const deleteUser =  async function(req, res){
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

*/