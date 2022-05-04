import {Router} from 'express';
const router = Router();

import * as UserController from '../controller/user.controller.js'

import * as AuthMiddleware from '../middleware/auth.middleware.js'


//router.post('/checktoken', AuthMiddleware.verifyToken)

router.post('/store', UserController.storeUser)

router.get('/index', UserController.indexUsers)

router.get('/alumnos', UserController.getAlumnos)

router.get('/profesores', UserController.getProfesores)

router.get('/:userid', UserController.getUserById)

router.put('/:userid', UserController.updateUser)

router.post('/disableUser', UserController.disableUser)

router.post('/enableUser', UserController.enableUser)

router.post('/resetPassword', UserController.resetPassword)

router.post('/addcursotoprofesor', UserController.addCursoToProfesor)




/*
router.delete('/:cursoid', UserController.deleteUser)

*/

export default router;
