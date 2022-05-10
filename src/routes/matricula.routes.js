import {Router} from 'express';
const router = Router();
import * as matriculaController from '../controller/matricula.controller.js'
import * as UserController from '../controller/user.controller.js'

router.post('/store', matriculaController.storeMatricula)

router.get('/index', matriculaController.indexMatricula)

router.get('/:matriculaid', matriculaController.getMatriculaById)

router.put('/:matriculaid', matriculaController.updateMatricula)

/*
router.delete('/:matriculaid', matriculaController.deleteMatricula)
*/

export default router;
