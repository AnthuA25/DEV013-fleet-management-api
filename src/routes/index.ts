import express, { Router } from 'express';
import taxisRouter from './taxis';
import trajectoriesRouter from './trajectories'

const router: Router = express.Router();

// Agregar otros enrutadores aquí si es necesario
router.use('/', taxisRouter);
router.use('/',trajectoriesRouter)

// Exportar el enrutador principal
export default router;