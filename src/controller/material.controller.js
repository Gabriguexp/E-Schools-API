import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get, child, update, remove} from "firebase/database";
import firebaseApp from '../database.js';

const db = getDatabase();

export const storeMaterial = async function(req, res){
    try{
        let nombre = req.body.nombre;
        let tipo = req.body.tipo;
        let visible = req.body.visible;
        let curso = req.body.curso;
        if (nombre == '' && descripcion == '' && visible == '' && curso == '') {
            res.status(401).json({ message: "Algún campo está vacio" });
        } else {            
            const materiales = ref(db, 'curso/'+ curso +'/material')
            const newMaterial = push(materiales)
            let data = req.body.data;

            if(tipo == 'enlace'){
                set(newMaterial, {
                    nombre : nombre, 
                    tipo : tipo,
                    data: data,
                    visible: visible,
                })
                res.status(200).json({ message: "Material añadido" });
            } else if(tipo == 'PDF'){
                
                let file = req.files.file;
                file.mv('public/public/'+curso +'/' +file.name, true, function(err) {
                    console.log('moving file')
                    if (err){
                        console.log('error subiendo archivo')
                        console.log(err)
                        return res.status(500).send(err);
                    }

                })
                set(newMaterial, {
                    nombre : nombre, 
                    tipo : tipo,
                    file: file.name,
                    visible: visible,
                })
                res.status(200).json({ message: "FILE UPLOADED" });
            } else if (tipo == 'bloque'){
                set(newMaterial, {
                    nombre : nombre, 
                    tipo : tipo,
                    visible: visible,
                })
            } else if (tipo == 'tarea'){
                let descripcion = req.body.descripcion
                set(newMaterial, {
                    nombre : nombre, 
                    tipo : tipo,
                    visible: visible,
                    descripcion: descripcion
                })
            }
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

export const getBloques = async function(req, res){
    try{
        let id = req.params.cursoid
        let bloques = []
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ id +'/material')).then((snapshot) => {
            if (snapshot.exists()) {
                let material = snapshot.val()
                for(var i in material){
                    if (material[i].tipo == 'bloque'){
                        bloques.push([i, material[i]])
                    }
                }
                res.status(200).json({ message: "Devolviendo bloques", bloques: bloques });
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
        let cursoid = req.params.cursoid;
        let materialid = req.params.materialid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ cursoid+'/material/'+ materialid)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                let material = snapshot.val()
                res.status(200).json({ message: "Devolviendo material", material: material });
            } else {
                console.log("No data available");
                res.status(200).json({ message: "No se ha encontrado el material", });
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
        let visible = req.body.visible
        let idcurso = req.params.cursoid;
        let materialid = req.params.materialid
        let descripcion = req.body.descripcion
        const dbRef = ref(getDatabase());
        
        get(child(dbRef, 'curso/'+ idcurso+'/material/'+ materialid)).then((snapshot) => {
            if (snapshot.exists()) {
                //console.log(snapshot.val());
                const material = ref(db, 'curso/'+ idcurso+'/material/'+ materialid)
                if (descripcion != undefined && descripcion != ''){
                    update(material, {
                        nombre : nombre, 
                        visible : visible,
                        descripcion: descripcion,
                    })
                } else {
                    update(material, {
                        nombre : nombre, 
                        visible : visible,
                    })
                }
                

                res.status(200).json({ message: "material actualizado", });
            } else {
                console.log("No data available");
                res.status(401).json({ message: "No se ha encontrado el material", });
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}

import {unlink} from 'node:fs'

export const deleteMaterial = async function(req, res){
    try{
        let cursoid = req.body.cursoid;
        let materialid = req.body.materialid;
        console.log('cursoid'+ cursoid)
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'curso/'+ cursoid+'/material/'+ materialid)).then((snapshot) => {
            if (snapshot.exists()) {

                const material = ref(db, 'curso/'+ cursoid+'/material/'+ materialid)
                let materialSnapShot = snapshot.val()
                if (materialSnapShot.tipo == 'PDF'){
                    let file = snapshot.val().file
                    let path = 'public/public/'+cursoid +'/' +file
                       unlink(path, function(){
                        console.log('borrado el archivo')
                    })
                }
                
                
                remove(material)
                

                res.status(200).json({ message: "Material borrado.", });

            } else {
                console.log("No data available");
                res.status(401).json({ message: "No se ha encontrado el material", });
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}
/*
//Test
export const test = async function(req, res){
    try{
        //res.status(200).json({ message: JSON.parse(req) });
        console.log('test')
        console.log('headers')
        console.log(req.headers)
        console.log('body')
        console.log(req.body)
        console.log('curso')
        console.log(req.body.curso)
        console.log('file')
        console.log(req.files.file)
        //console.log(req)
        let file = req.files.file;
        let curso = req.body.curso
        //console.log(req.files.file)
       // console.log(__dirname)
       
       

       res.status(200).json({fileName: file.name, filePath: `/public/images/${file.name}`});
   
        file.mv('public/'+curso +'/' +file.name, true, function(err) {
            console.log('moving file')
            if (err){
                console.log('error subiendo archivo')
                console.log(err)
                return res.status(500).send(err);
            }
            res.status(200).json({ message: "FILE UPLOADED" });
        });
        

        //res.status(200).json({ message: "Test Succeeded" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "An error occured" });
    }
}
*/