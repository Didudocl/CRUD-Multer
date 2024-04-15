// Importar los módulos necesarios
import express from 'express';
import multer from 'multer';
import { createForm, getForm, getArchive, updateForm, deleteForm } from '../controllers/form.controller.js';

// Crear un enrutador de Express
const router = express.Router();

// Configuración del almacenamiento de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/upload/'); // Se define la carpeta de destino donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Middleware para verificar el tamaño del archivo
const fileFilter = (req, file, cb) => {
    // Verificar el tamaño del archivo
    if (file.size > 5 * 1024 * 1024) { // 1 MB
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Configurar Multer con la configuración y el filtro de archivos
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 1 MB
    }
});

// Rutas
router.post('/', upload.fields([{ name: 'archivo', maxCount: 1 }]), (req, res) => {res.status(400).json({message: "El tamaño del archivo excede el límite permitido de 1 MB"})}, createForm);
router.get('/:id', getForm);
router.get('/src/upload/:filename', getArchive);
router.put('/:id', upload.fields([{ name: 'archivo', maxCount: 1 }]),(req, res) => {res.status(400).json({message: "El tamaño del archivo excede el límite permitido de 1 MB"})}, updateForm);
router.delete('/:id', deleteForm);

// Exportar el enrutador
export default router;
