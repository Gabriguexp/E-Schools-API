import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get, child, remove, } from "firebase/database";
import { initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged, signOut,  } from "firebase/auth";
import firebaseApp from '../database.js';
import transporter from '../email.js'
import adminAuth from "../admin.authdb.js";


const auth = initializeAuth(firebaseApp);
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const database = getDatabase();
export const login = async function(req, res){
    try {
        console.log(req.body)
        let email = req.body.email;
        let password = req.body.password;
        await signInWithEmailAndPassword(auth, email, password).then(
          async (result) => {
              console.log(result)
              console.log(result.user.email)
              //const auth = getAuth();

              checkUser(email, res)
              return
              //res.status(200).json({ message: "Inicio de sesión correcto" });
              /*let usuario = await getUserByEmail(result.user.email).then(function(){
                console.log('usuario....')
                console.log(usuario)
                console.log('asdf')
                console.log(usuario[1].activo)
                res.status(200).json({ message: "Inicio de sesión correcto" });
              }).catch(function(){

              })*/
              
              /*onAuthStateChanged(auth, (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const uid = user.uid;
                  

                  console.log('uid: '+ uid)
                  // ...
                } else {
                  // User is signed out
                  // ...
                }
              });*/

              //res.status(200).json({ message: "Inicio de sesión correcto" });
          },
          function (error) {
            console.log(error);
            res.status(401).json({ message: "Datos de inicio de sesión incorrectos" });
          }
        );
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

export const register =  async function(req, res){
    try {
        let email = req.body.email;
        let password = req.body.password;
        let nombre = req.body.nombre;
        let apellidos = req.body.apellidos;
        //Comprobar datos de register y si esta todo ok almacenarlo.

        if (emailRegex.test(email) && password.length >=6 && nombre != '' && apellidos != ''){
          await createUserWithEmailAndPassword(auth, email, password).then(
            async (result) => {
                let userId = result.user.uid
                const db = getDatabase();
                set(ref(db, 'users/' + userId), {
                  nombre : nombre, 
                  apellidos : apellidos,
                  email: email,
                  rol: 'alumno',
                  activo: true,
                });

                res.status(200).json({ message: "Registro correcto" });
            },
            function (error) {
              console.log(error);
              res.status(401).json({ message: "Registro incorrecto" });
            }
          );
        } else {
            res.status(401).json({ message: "Faltan datos en el registro" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}


export const registerProfesor = async function(req, res){
    try {
        let email = req.body.email;
        let password = req.body.password;
        let rePass = req.body.repassword
        let nombre = req.body.nombre;
        let apellidos = req.body.apellidos;
        let tokenRegistro = req.body.tokenRegistro
        console.log('token registro' + tokenRegistro)
        //Comprobar datos de register y si esta todo ok almacenarlo.
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'invitacion/'+tokenRegistro)).then((snapshot) => {
          if (snapshot.exists()) {
            if (password != rePass){
              
              res.status(401).json({ message: "Las contraseñas no coinciden" });
              return
            }
            if (emailRegex.test(email) && password.length >=6 && nombre != '' && apellidos != ''){
              createUserWithEmailAndPassword(auth, email, password).then(
                async (result) => {
                    let userId = result.user.uid
                    const db = getDatabase();
                    set(ref(db, 'users/' + userId), {
                      nombre : nombre, 
                      apellidos : apellidos,
                      email: email,
                      rol: 'profesor',
                      activo: true,
                    });
                    const invitacion = ref(db, 'invitacion/'+tokenRegistro)
                    remove(invitacion)
                    res.status(200).json({ message: "Registro correcto" });
                    return
                },
                function (error) {
                  console.log(error);
                  res.status(401).json({ message: "Registro incorrecto" });
                  return
                }
              );
            } else {
              res.status(401).json({ message: "Registro incorrecto" });
              return
            }
          } else {
              console.log("No data available");
              res.status(400).json({ message: "La invitación no existe o ha caducado, contacte con el administrador", });
              return
          }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
        return
    }
}

function checkUser(email, res){
  console.log('getuserbyid')
  try{
    let usuarios = {}
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users')).then((snapshot) => {
        if (snapshot.exists()) {
            //console.log(snapshot.val());
            usuarios = snapshot.val()
            for(var i in usuarios){                    
                if (usuarios[i].email == email){
                  console.log('lo encontre')
                  console.log(i, usuarios[i])
                  console.log('activo: ' + usuarios[i].activo)
                  if (usuarios[i].activo || usuarios[i].activo == undefined){
                    //const auth = getAuth();
                    console.log('auth.currentuser')
                    //EL TOKEN!
                    //auth.currentUser.stsTokenManager.accessToken
                    let token = auth.currentUser.stsTokenManager.accessToken
                    console.log(token)
                    res.status(200).json({ message: "Login correcto", token: token  });

                  }else {
                    
                    signOut(auth).then(() => {
                      console.log('cerrando sesion al usuario por espabilao')
                      // Sign-out successful.
                    }).catch((error) => {
                      // An error happened.
                    });
                    res.status(400).json({ message: "Usuario dado de baja",  });
                  }
                  //return[i, usuarios[i]]

                  
                  return
                }
            }
            res.status(400).json({ message: "No se ha encontrado al usuario", });
        } else {
            //return "No data available";
            res.status(200).json({ message: "No hay usuarios actualmente", });
        }
    })
  }catch (error) {
      console.log(error);
      return error
  }
}

export const checkUserLogged = async (req, res) => {
  try {

    //let idToken = req.body.sessiontoken
    let idToken = req.headers['x-access-token'];
    console.log('cabeceras de cul')
    console.log(req.headers)
    console.log('getauth')
    console.log(auth)
    
    adminAuth.verifyIdToken(idToken, false)
    .then((decodedToken) => {
      const id = decodedToken.uid;
      const dbRef = ref(getDatabase());
      let usuario 
      get(child(dbRef, 'users/'+ id)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log('asdada ')
            console.log(snapshot.val());
            usuario = snapshot.val()
            return res.status(200).json({message: 'Authentication ok', user: usuario});
          } else {
            console.log("No data available");
            return res.status(200).json({message: 'Authentication ok', user: ''});
            
          }
      })
      console.log('a')
      
    
    })
    .catch((error) => {
    
        // Handle error
        console.log('b')
        return res.status(403).json({message: 'Authentiation failed'});
    });
  } catch (error) {
      return res.status(401).json({message: 'Authentication failed'});
  }
}


export const logout = async(req, res )  => {
  try {
    signOut(auth).then(() => {
      console.log('cerrando sesion al usuario')
      // Sign-out successful.
      return res.status(200).json({message: 'Logout'});
    }).catch((error) => {
      console.log('error cerrando sesion')
      console.log(error)
      return res.status(401).json({message: 'Error al cerrar sesión'});
      // An error happened.
    });
  } catch (error) {
    return res.status(401).json({message: 'Authentication failed'});
  }
}

export const inviteUser = async function(req, res ){
  let email = req.body.email
  console.log('email: ' + email)
  let enlace = 'http://localhost:8080/#/auth/registerProfesor/' 
  //Añadir token
  let token = '1234'
    set(ref(database, 'invitacion/'+token), {
      email: email,
      token: token,
    });
    
  enlace += token


  var mailOptions = {
    from: 'dwesggex@gmail.com',
    to: email,
    subject: 'Invitación a ser profesor de E-Schools',
    text: '¡Hola! Bienvenid@ a E-Schools esperamos que disfrutes tu experiencia, haz click en el siguiente enlace para registrarte en la plataforma.' + enlace
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log('error enviando email');  
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.status(200).json({ message: "Invitación enviada"  }); 
}


export const getInvitacion = async function(req, res){
  let tokenRegistro = req.params.tokenRegistro
  const dbRef = ref(getDatabase());
  get(child(dbRef, 'invitacion/'+tokenRegistro)).then((snapshot) => {
    if (snapshot.exists()) {
      let email = snapshot.val().email
      res.status(200).json({ message: "devolviendo invitacion", email: email });
    } else {
        console.log("No data available");
        res.status(400).json({ message: "La invitación no existe o ha caducado, contacte con el administrador", });
        return
    }
  })
}