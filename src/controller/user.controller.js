import { getDatabase, ref, set, push, get, child, update, remove} from "firebase/database";
import { initializeAuth, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail } from "firebase/auth";
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
                          activo: true
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
                console.log("No data available");
                res.status(200).json({ message: "No se ha encontrado el usuario", });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const getAlumnoById = async function(id){
    try{
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                let usuario = snapshot.val()
                return usuario.nombre;
            } else {
                console.log("No data available");
                return 'No hay';
            }
        })
    } catch (error) {
        console.log(error);
        return 'No hay';
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
                const user = ref(db, 'users/'+id)
                update(user, {
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


export const disableUser =  async function(req, res){
    try{
        let id = req.body.userid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                const user = ref(db, 'users/'+id)
                update(user, {
                    activo: false
                })
                res.status(200).json({ message: "usuario dado de baja", });
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

export const enableUser =  async function(req, res){
    try{
        let id = req.body.userid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users/'+ id)).then((snapshot) => {
            if (snapshot.exists()) {
                const user = ref(db, 'users/'+id)
                update(user, {
                    activo: true
                })
                res.status(200).json({ message: "usuario dado de alta", });
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

export const resetPassword = async function(req, res){
    try{
        console.log('reset password')
        let email = req.body.email
        
        
        sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log('Password reset email sent!')
          res.status(200).json({ message: 'Email de reseteo de contraseña enviado.' });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('errorCode: ' + errorCode)
          console.log('errorMsg: ' + errorMessage)
          res.status(400).json({ message: errorMessage });

        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const addCursoToProfesor = async function(req, res){
    try{
        console.log('reset password')
        let profesorId = req.body.profesorId
        let cursoId = req.body.cursoId
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'users/'+ profesorId)).then((snapshot) => {
            if (snapshot.exists()) {
                const cursos = ref(db, 'users/'+profesorId+'/cursos')
                const newProfesorCurso = push(cursos)
                set(newProfesorCurso, {
                    curso : cursoId, 
                })
                res.status(200).json({ message: "Curso añadido al profesor", });
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