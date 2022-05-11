import {Router} from 'express';
const router = Router();
import * as tareaController from '../controller/tarea.controller.js'

router.get('/getTareasEntregadas/:idtarea', tareaController.getTareasEntregadas)

router.post('/calificarTarea/', tareaController.calificarTarea)

export default router;
