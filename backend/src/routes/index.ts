import { Router } from 'express';
import pessoasRouter from './pessoas.routes';

const routes = Router();

routes.use('/pessoas', pessoasRouter);

export default routes;
