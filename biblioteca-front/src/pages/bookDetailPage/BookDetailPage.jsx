import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import bookService from '../../services/bookService';
import prestamoService from '../../services/prestamoService'; 
import { useAuth } from '../../context/AuthContext';
import styles from './BookDetailPage.module.css';

const BookDetailPage = () => {
    const { bookId } = useParams();
    const { isAuthenticated, user } = useAuth();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para la acción de préstamo
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loanMessage, setLoanMessage] = useState({ type: '', text: '' }); 

    useEffect(() => {
        if (bookId) {
            setLoading(true);
            setError(null);
            setLoanMessage({ type: '', text: '' }); // Limpia mensajes al cargar
            bookService.getBookById(bookId)
                .then(response => {
                    setBook(response.data);
                })
                .catch(err => {
                    // ... (manejo de error de carga de libro existente)
                    console.error("Error fetching book details:", err);
                    if (err.response && err.response.status === 404) {
                        setError("Libro no encontrado.");
                    } else {
                        setError("No se pudo cargar la información del libro.");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [bookId]);

    const handleBorrow = async () => {
        setIsSubmitting(true);
        setLoanMessage({ type: '', text: '' });
        try {
            await prestamoService.solicitarPrestamo(book.id);
            setLoanMessage({ type: 'success', text: '¡Préstamo realizado con éxito! Tienes 15 días para devolver el libro.' });
            // Actualizamos el estado local del libro para reflejar el cambio inmediatamente
            setBook(prevBook => ({ ...prevBook, disponible: false }));
        } catch (err) {
            const errorMessage = err.response?.data || "Ocurrió un error al procesar la solicitud.";
            setLoanMessage({ type: 'error', text: errorMessage });
            console.error("Error al solicitar el préstamo:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className={styles.statusMessage}>Cargando información del libro...</div>;
    }

    if (error) {
        // ... (JSX para mostrar error de carga sin cambios)
        return (
            <div className={styles.statusMessageError}>
                <p>Error: {error}</p>
                <Link to="/" className={styles.backLink}>Volver al inicio</Link>
            </div>
        );
    }

    if (!book) {
        return null; // O un mensaje de que no se encontró el libro
    }

    const placeholderImage = 'https://via.placeholder.com/300x450.png?text=No+Cover';

    return (
        <div className={styles.detailPageContainer}>
            <Link to="/" className={styles.backLinkToList}>← Volver</Link>
            <div className={styles.bookDetailContent}>
                <div className={styles.coverSection}>
                    <img
                        src={book.portada || placeholderImage}
                        alt={`Portada de ${book.titulo}`}
                        className={styles.bookCoverImage}
                        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                    />
                </div>
                <div className={styles.infoSection}>
                    <h1 className={styles.bookTitle}>{book.titulo}</h1>
                    <p className={styles.bookAuthor}>por {book.autor}</p>
                    <p className={styles.bookIsbn}><strong>ISBN:</strong> {book.isbn}</p>
                    <p className={styles.bookAvailability}>
                        <strong>Disponibilidad:</strong>
                        <span className={book.disponible ? styles.available : styles.notAvailable}>
                            {book.disponible ? ' Disponible' : ' No Disponible'}
                        </span>
                    </p>
                    <h3 className={styles.descriptionTitle}>Descripción</h3>
                    <p className={styles.bookDescription}>{book.descripcion || 'No hay descripción disponible.'}</p>

                    {/* --- LÓGICA DEL BOTÓN DE PRÉSTAMO --- */}
                    {isAuthenticated && user?.rol === 'USUARIO' && ( // <-- NUEVA CONDICIÓN: verifica el rol
                    <div className={styles.borrowSection}>
                        {book.disponible ? (
                            <button onClick={handleBorrow} disabled={isSubmitting} className={styles.borrowButton}>
                                {isSubmitting ? 'Procesando...' : 'Solicitar Préstamo'}
                            </button>
                        ) : (
                            <p className={styles.notAvailableMessage}><strong>Este libro ya ha sido prestado.</strong></p>
                        )}
                    </div>
                    )}
                    {isAuthenticated && user?.rol === 'ADMINISTRADOR' && (
                        <div className={styles.adminMessage}>
                           <strong> Estás viendo como administrador. No puedes solicitar préstamos.</strong>
                        </div>
                    )}

                    {!isAuthenticated && (
                         <p className={styles.loginPrompt}>
                            <Link to="/login">Inicia sesión</Link> para solicitar un préstamo.
                         </p>
                    )}
                    {/* --- FIN LÓGICA DEL BOTÓN --- */}

                    {/* --- MENSAJES DE RESPUESTA --- */}
                    {loanMessage.text && (
                        <div className={loanMessage.type === 'success' ? styles.successMessage : styles.errorMessage}>
                            {loanMessage.text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;