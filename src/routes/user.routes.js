import {Router} from 'express';
const router = Router();
import * as UserController from '../controller/user.controller.js'

router.post('/store', UserController.storeUser)

router.get('/index', UserController.indexUsers)

router.get('/alumnos', UserController.getAlumnos)

router.get('/profesores', UserController.getProfesores)

router.get('/:userid', UserController.getUserById)

router.put('/:userid', UserController.updateUser)

router.post('/disableUser', UserController.disableUser)

router.post('/enableUser', UserController.enableUser)

router.post('/resetPassword', UserController.resetPassword)

/*
router.delete('/:cursoid', UserController.deleteUser)

*/

export default router;
