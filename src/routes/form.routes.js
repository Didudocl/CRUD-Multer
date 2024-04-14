'use strict';

import express from 'express';
import { createForm, getForm,  getArchive, updateForm, deleteForm } from '../controllers/form.controller.js';
import multer from 'multer';
const router = express.Router();

// ! Configuración del almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/upload/'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// ! Rutas
router.post('/', upload.fields([{name: 'archivo', maxCount: 1}]) , createForm);
router.get('/:id', getForm);
router.get('/src/upload/:filename', getArchive);
router.put('/:id', upload.fields([{name: 'archivo', maxCount: 1}]) ,updateForm);
router.delete('/:id', deleteForm);

export default router;