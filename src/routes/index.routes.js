'use strict';

import express from 'express';
import formRoutes from './form.routes.js';

const router = express.Router();

router.use('/form', formRoutes);

export default router;