import {Router} from 'express';
const router = Router();
import * as materialController from '../controller/material.controller.js'

router.post('/store', materialController.storeMaterial)

router.post('/test', materialController.test)

//router.get('/index', materialController.indexMaterial)

//router.get('/:cursoid', materialController.getMaterialById)

//router.put('/:cursoid', materialController.updateMaterial)



/*
router.delete('/:cursoid', cursoController.deleteCurso)
*/

export default router;
