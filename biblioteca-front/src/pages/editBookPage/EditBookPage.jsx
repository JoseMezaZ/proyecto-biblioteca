import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService from '../../services/bookService';
import BookForm from '../../components/bookForm/BookForm';
import styles from '../AddBookPage/AddBookPage.module.css'; // Reutilizamos estilos

const EditBookPage = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        bookService.getBookById(bookId)
            .then(response => {
                setBook(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al cargar el libro para editar:", error);
                setServerError("No se pudo cargar la información del libro.");
                setLoading(false);
            });
    }, [bookId]);

    const handleEditBook = async (data) => {
        const bookData = { ...data, cantidadBusquedas: Number(data.cantidadBusquedas) || 0 };
        try {
            await bookService.updateBook(bookId, bookData);
            alert('¡Libro actualizado con éxito!');
            navigate('/admin');
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            setServerError(error.response?.data?.message || 'Error en el servidor.');
        }
    };

    if (loading) return <p>Cargando libro...</p>;
    if (serverError) return <p className={styles.errorMessage}>{serverError}</p>;

    return (
        <div className={styles.pageContainer}>
            <h2>Editar Libro (ID: {bookId})</h2>
            {/* El prop 'key={bookId}' fuerza a react-hook-form a reinicializarse cuando el libro carga */}
            {book && <BookForm key={bookId} onSubmit={handleEditBook} defaultValues={book} isEditing={true} />}
        </div>
    );
};

export default EditBookPage;