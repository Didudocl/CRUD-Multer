import Form from '../models/form.model.js'
import {HOST, PORT} from '../config/configEnv.js'

export async function createForm(req, res) {
    try {
        
        // Obtener el nombre del archivo cargado
        const archivo = req.files['archivo'][0].filename;
        const URL = `http://${HOST}:${PORT}/api/form/src/upload/`;
        // Crear el objeto de datos del formulario
        const formData = {
            nombre: req.body.nombre,
            email: req.body.email,
            archivo: URL+archivo // Construir la URL del archivo cargado
        };

        // Crear una nueva instancia del modelo Form con los datos del formulario
        const newForm = new Form(formData);

        // Guardar el formulario en la base de datos
        const formSaved = await newForm.save();

        // Responder con un código de estado 201 (Creado) y los datos del formulario guardado
        res.status(201).json({
            message: "Formulario enviado correctamente!",
            data: formSaved
        });
    } catch (error) {
        // Manejar los errores y responder con un código de estado 500 (Error del servidor)
        res.status(500).json({
            message: error.message
        });
    }
}

  // Función para obtener un archivo
export async function getArchive(req, res) {
    try {
      // Obtiene el nombre del archivo de los parámetros de la solicitud
      const filename = req.params.filename;
      // Construye la ruta completa del archivo
      const file = `src/upload/${filename}`;
      
      // Descarga el archivo como respuesta a la solicitud
      res.download(file, (err) => {
        if (err) {
          // Si hay un error al descargar el archivo, envía un código de estado 404 (No Encontrado)
          res.status(404).json({
            message: "Archivo no encontrado"
          })
        }
      });
    } catch (error) {
      // Si ocurre un error en el bloque try, envía un código de estado 500 (Error Interno del Servidor) con el mensaje de error
      res.status(500).json({ 
        message: error.message
      });
    }
  };
  
  // Función para obtener un formulario por su ID
export async function getForm(req, res) {
    try {
        const id = req.params.id; // Obtiene el ID del formulario de los parámetros de la solicitud
          
        const form = await Form.findById(id); // Busca el formulario en la base de datos por su ID
      
        res.status(200).json({
            message: "Formulario encontrado!", // Envía un mensaje de éxito
            data: form // Envía los datos del formulario encontrado
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message // Maneja los errores y envía un mensaje de error
        });
    }
  }
  
  // Función para actualizar un formulario existente
  export async function updateForm(req, res) {
      try {
          const id = req.params.id; // Obtiene el ID del formulario a actualizar de los parámetros de la solicitud

          const archivo = req.files['archivo'][0].filename; // Obtiene el nombre del archivo cargado

          const URL = `http://${HOST}:${PORT}/api/form/src/upload/`; // Define la URL base para los archivos

          // Actualiza la entidad Form en la base de datos
          const formUpdated = await Form.findOneAndUpdate({ _id: id }, // Busca el formulario por su ID
          {
              nombre: req.body.nombre, // Actualiza el nombre del formulario
              email: req.body.email, // Actualiza el correo electrónico del formulario
              archivo: URL+archivo // Actualiza el nombre del archivo con la URL base
          },
          { new: true } // Opción para devolver el documento actualizado
          );
    
          // Devuelve la entidad del formulario actualizada
          return res.status(200).json({
              message: "Formulario modificado exitosamente!", // Envía un mensaje de éxito
              data: formUpdated // Envía los datos del formulario actualizado
          });
      } catch (error) {
          return res.status(500).json({ 
              message: "Error al actualizar la postulacion", // Maneja los errores y envía un mensaje de error
              error: error.message // Agrega el mensaje de error para ayudar con la depuración
          });
      }
  }
  
  // Función para eliminar un formulario existente por su ID
  export async function deleteForm(req, res) {
      try {
          const id = req.params.id; // Obtiene el ID del formulario a eliminar de los parámetros de la solicitud
  
          const formDeleted = await Form.findByIdAndDelete(id); // Elimina el formulario de la base de datos por su ID y espera la eliminación
  
          // Envía un mensaje de éxito junto con los datos del formulario eliminado
          res.status(200).json({
              message: "Formulario eliminado!", // Envía un mensaje de éxito
              data: formDeleted // Envía los datos del formulario eliminado
          });
      } catch (error) {
          // Maneja los errores y envía un mensaje de error
          res.status(500).json({
              message: error.message // Envía un mensaje de error
          });
      }
  }
  