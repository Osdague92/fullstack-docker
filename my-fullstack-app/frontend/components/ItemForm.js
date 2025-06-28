import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { createItem, updateItem } from '../services/itemService';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'El nombre es demasiado corto!')
    .max(50, 'El nombre es demasiado largo!')
    .required('El nombre es requerido'),
  description: Yup.string()
    .max(200, 'La descripción es demasiado larga!')
    .required('La descripción es requerida'),
});

function ItemForm({ itemToEdit, onFormSuccess }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        if (itemToEdit) {
          await updateItem(itemToEdit._id, values);
          alert('Ítem actualizado con éxito!');
        } else {
          await createItem(values);
          alert('Ítem creado con éxito!');
        }
        resetForm();
        onFormSuccess();
      } catch (err) {
        alert('Error al guardar el ítem. Por favor, verifique la consola.');
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (itemToEdit) {
      formik.setValues({
        name: itemToEdit.name || '',
        description: itemToEdit.description || '',
      });
    } else {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToEdit]);

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4, maxWidth: 600, mx: 'auto', borderRadius: '12px' }}>
      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1a202c' }}>
        {itemToEdit ? 'Editar Ítem' : 'Crear Nuevo Ítem'}
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Nombre del Ítem"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Descripción del Ítem"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 3 }}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
          sx={{
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #17a2b8 90%)',
            },
          }}
        >
          {itemToEdit ? 'Actualizar Ítem' : 'Crear Ítem'}
        </Button>
        {itemToEdit && (
          <Button
            color="secondary"
            variant="outlined"
            fullWidth
            onClick={() => onFormSuccess()}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '8px',
              borderColor: '#f50057',
              color: '#f50057',
              '&:hover': {
                backgroundColor: 'rgba(245, 0, 87, 0.04)',
                borderColor: '#c51162',
                color: '#c51162',
              },
            }}
          >
            Cancelar Edición
          </Button>
        )}
      </Box>
    </Paper>
  );
}

export default ItemForm;