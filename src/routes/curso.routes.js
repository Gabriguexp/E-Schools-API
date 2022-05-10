import {Router} from 'express';
const router = Router();
import * as cursoController from '../controller/curso.controller.js'
import * as examenController from '../controller/examen.controller.js'

router.post('/store', cursoController.storeCurso)

router.get('/index', cursoController.indexCurso)

router.get('/:cursoid', cursoController.getCursoById)

router.put('/:cursoid', cursoController.updateCurso)

router.get('/:cursoid/examen/:examenid', examenController.getExamenById)

router.put('/:cursoid/examen/:examenid', examenController.updateExamen)



/*
router.delete('/:cursoid', cursoController.deleteCurso)
*/

export default router;
