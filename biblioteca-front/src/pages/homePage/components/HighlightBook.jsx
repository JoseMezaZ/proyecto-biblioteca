import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HighlightBook.module.css';

const HighlightBook = ({ book, showTitle = false }) => { // showTitle es false si el título general lo pone el carrusel
    if (!book) {
        return null;
    }

    const placeholderImage = 'https://via.placeholder.com/300x450.png?text=No+Cover';
    const truncateDescription = (text, maxLength) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
    };

    return (
        <div className={styles.highlightSection}> {/* Cambiado de <section> a <div> para anidamiento */}
            {showTitle && <h2 className={styles.sectionTitle}>Libro Destacado</h2>}
            <div className={styles.highlightContent}>
                <div className={styles.coverWrapper}>
                    <img
                        src={book.portada || placeholderImage}
                        alt={book.titulo}
                        className={styles.bookCover}
                        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                    />
                </div>
                <div className={styles.bookDetails}>
                    <h3 className={styles.bookTitle}>{book.titulo}</h3>
                    <p className={styles.bookAuthor}>por {book.autor}</p>
                    <p className={styles.bookDescription}>
                        {truncateDescription(book.descripcion, 180)}
                    </p>
                    <Link to={`/book/${book.id}`} className={styles.detailsButton}>
                        Ver detalles
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HighlightBook;