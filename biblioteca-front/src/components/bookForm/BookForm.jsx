import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './BookForm.module.css';

const BookForm = ({ onSubmit, defaultValues = {}, isEditing = false }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValues
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.bookForm}>
            <div className={styles.formGroup}>
                <label>Título</label>
                <input {...register("titulo", { required: "El título es obligatorio" })} />
                {errors.titulo && <p className={styles.validationError}>{errors.titulo.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label>Autor</label>
                <input {...register("autor", { required: "El autor es obligatorio" })} />
                {errors.autor && <p className={styles.validationError}>{errors.autor.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label>ISBN</label>
                <input {...register("isbn")} />
            </div>

            <div className={styles.formGroup}>
                <label>URL de la Portada</label>
                <input type="url" {...register("portada")} />
            </div>

            <div className={styles.formGroup}>
                <label>Descripción</label>
                <textarea {...register("descripcion")} rows="4"></textarea>
            </div>

            <div className={styles.formGroup}>
                <label>Cantidad de Búsquedas</label>
                <input type="number" {...register("cantidadBusquedas", { valueAsNumber: true })} />
            </div>

            <div className={styles.checkboxGroup}>
                <label><input type="checkbox" {...register("disponible")} /> Disponible</label>
                <label><input type="checkbox" {...register("novedad")} /> Novedad</label>
                <label><input type="checkbox" {...register("destacado")} /> Destacado</label>
            </div>

            <button type="submit" className={styles.submitButton}>
                {isEditing ? 'Actualizar Libro' : 'Guardar Libro'}
            </button>
        </form>
    );
};

export default BookForm;