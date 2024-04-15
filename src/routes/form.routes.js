lea// Importar los módulos necesarios
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

// Configurar Multer con la configuración y el filtro de archivos
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 *1024 // Validación de que el archivo sea como máximo de 5 KB
    }
});

// Middleware para manejar el error de límite de tamaño de archivo
const handleFileSizeLimit = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ message: "El tamaño del archivo excede el límite de 1 MB" });
    } else {
        next(err);
    }
};

// Rutas
router.post('/', upload.fields([{ name: 'archivo', maxCount: 1 }]), createForm);
router.get('/:id', getForm);
router.get('/src/upload/:filename', getArchive);
router.put('/:id', upload.fields([{ name: 'archivo', maxCount: 1 }]), updateForm);
router.delete('/:id', deleteForm);

router.use(handleFileSizeLimit); // Aplicar middleware para manejar el error de límite de tamaño de archivo

// Exportar el enrutador
export default router;
