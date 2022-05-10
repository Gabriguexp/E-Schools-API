import {Router} from 'express';
const router = Router();
import * as examenController from '../controller/examen.controller.js'

router.post('/store', examenController.storeExamen)

router.get('/index', examenController.indexExamen)
/*
router.get('/:examenid', examenController.getExamenById)

router.put('/:examenid', examenController.updateExamen)
*/

/*
router.delete('/:examenid', examenController.deleteExamen)
*/

export default router;
