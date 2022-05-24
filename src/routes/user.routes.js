import {Router} from 'express';
const router = Router();

import * as UserController from '../controller/user.controller.js'

import * as authMiddleware from '../middleware/auth.middleware.js'

//router.post('/checktoken', AuthMiddleware.verifyToken)

router.post('/store', authMiddleware.verifyAdminToken, UserController.storeUser)

router.get('/index', authMiddleware.verifyToken, UserController.indexUsers)

router.get('/alumnos', authMiddleware.verifyToken, UserController.getAlumnos)

router.get('/profesores', authMiddleware.verifyToken, UserController.getProfesores)

router.get('/:userid', authMiddleware.verifyToken, UserController.getUserById)

router.put('/:userid', authMiddleware.verifyToken, UserController.updateUser)

router.post('/disableUser', authMiddleware.verifyAdminToken, UserController.disableUser)

router.post('/enableUser', authMiddleware.verifyAdminToken, UserController.enableUser)

router.post('/resetPassword', authMiddleware.verifyToken, UserController.resetPassword)

router.post('/addcursotoprofesor', authMiddleware.verifyAdminToken, UserController.addCursoToProfesor)

router.get('/:userid/realizado/:examenid', authMiddleware.verifyToken, UserController.getExamenById)





/*
router.delete('/:cursoid', UserController.deleteUser)

*/

export default router;
