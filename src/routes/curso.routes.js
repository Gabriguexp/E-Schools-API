import {Router} from 'express';
const router = Router();
import * as cursoController from '../controller/curso.controller.js'

router.post('/store', cursoController.storeCurso)

router.get('/index', cursoController.indexCurso)

router.get('/:cursoid', cursoController.getCursoById)

router.put('/:cursoid', cursoController.updateCurso)

/*
router.delete('/:cursoid', cursoController.deleteCurso)
*/

export default router;
