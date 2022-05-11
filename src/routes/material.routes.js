import {Router} from 'express';
const router = Router();
import * as materialController from '../controller/material.controller.js'

router.post('/store', materialController.storeMaterial)

//router.post('/test', materialController.test)

//router.get('/index', materialController.indexMaterial)

router.get('/:cursoid/bloques', materialController.getBloques)

router.get('/:cursoid/:materialid', materialController.getMaterialById)

router.get('/:cursoid/:bloqueid/:materialid', materialController.getMaterialByIdFromBloque)

router.put('/:cursoid/:materialid', materialController.updateMaterial)

router.put('/:cursoid/:bloqueid/:materialid', materialController.updateMaterialFromBloque)

router.post('/deletematerial', materialController.deleteMaterial)





router.post('/storebloque', function(req, res){
    let nombre = req.body.nombre;
    let curso = req.body.curso
    const bloques = ref(db, 'curso/'+ curso +'/material/bloques')
    const newBloque = push(bloques)
    set(newBloque, {
        nombre : nombre, 
    })
    res.status(200).json({ message: "Material añadido" });
})

router.get('/:cursoid/bloque/:bloqueid', function(req, res){
    curso = req.params.cursoid
    bloque = req.params.bloqueid
})


export default router;
