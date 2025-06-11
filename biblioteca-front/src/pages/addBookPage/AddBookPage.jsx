import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookService from '../../services/bookService';
import BookForm from '../../components/bookForm/BookForm'; // Importa el formulario reutilizable
import styles from './AddBookPage.module.css';

const AddBookPage = () => {
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    const handleAddBook = async (data) => {
        const bookData = { ...data, cantidadBusquedas: Number(data.cantidadBusquedas) || 0 };
        try {
            await bookService.createBook(bookData);
            alert('¡Libro añadido con éxito!');
            navigate('/admin');
        } catch (error) {
            console.error('Error al crear el libro:', error);
            setServerError(error.response?.data?.message || 'Error en el servidor.');
        }
    };

    const defaultValues = {
        disponible: true,
        novedad: false,
        destacado: false,
        cantidadBusquedas: 0
    };

    return (
        <div className={styles.pageContainer}>
            <h2>Añadir Nuevo Libro</h2>
            {serverError && <p className={styles.errorMessage}>{serverError}</p>}
            <BookForm onSubmit={handleAddBook} defaultValues={defaultValues} />
        </div>
    );
};

export default AddBookPage;