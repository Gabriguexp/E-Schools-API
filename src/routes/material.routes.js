import {Router} from 'express';
const router = Router();
import * as materialController from '../controller/material.controller.js'

router.post('/store', materialController.storeMaterial)

router.post('/test', materialController.test)

//router.get('/index', materialController.indexMaterial)

router.get('/:cursoid/:materialid', materialController.getMaterialById)

//router.put('/:cursoid', materialController.updateMaterial)




router.post('/', materialController.deleteMaterial)


export default router;
