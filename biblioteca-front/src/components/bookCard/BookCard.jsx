import React from 'react';
import { Link } from 'react-router-dom'; // Para que la tarjeta sea clickeable
import styles from './BookCard.module.css';

// Este BookCard es para la cuadrícula de "Populares", enfocado en la portada.
const BookCard = ({ book }) => {
    console.log(`Renderizando BookCard para "${book?.titulo}", Portada URL:`, book?.portada);
    
    if (!book) {
        return null; // O un placeholder si el libro no está definido
    }

    // Usamos una imagen placeholder si no hay portada
    const placeholderImage = 'https://via.placeholder.com/150x220.png?text=No+Cover';

    return (
        <Link to={`/book/${book.id}`} className={styles.cardLink}> {/* Enlaza a la página de detalles del libro (crearemos esta ruta más adelante) */}
            <div className={styles.bookCard}>
                <img
                    src={book.portada || placeholderImage}
                    alt={book.titulo || 'Título no disponible'}
                    className={styles.bookCover}
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Manejo de error si la imagen de portada falla
                />
                <div className={styles.bookInfo}>
                    <h3 className={styles.bookTitle}>{book.titulo || 'Sin título'}</h3>
                    {/* Podríamos añadir el autor si hay espacio y se desea */}
                    {/* <p className={styles.bookAuthor}>{book.autor || 'Autor desconocido'}</p> */}
                </div>
            </div>
        </Link>
    );
};

export default BookCard;