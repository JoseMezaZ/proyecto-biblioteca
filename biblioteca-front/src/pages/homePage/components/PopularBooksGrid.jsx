import React, { useState } from 'react';
import BookCard from '../../../components/BookCard/BookCard';
import styles from './PopularBooksGrid.module.css';

const ITEMS_PER_PAGE = 6; // Mostraremos 6 libros por página en la cuadrícula

const PopularBooksGrid = ({ books, title }) => {
    const [currentPage, setCurrentPage] = useState(0);

    if (!books || books.length === 0) {
        return <p>No hay libros populares para mostrar.</p>;
    }

    const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);

    // Calcula qué libros mostrar en la página actual
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBooks = books.slice(startIndex, endIndex);

    const handleNextPage = () => {
        // Se asegura de no pasar de la última página
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    const handlePrevPage = () => {
        // Se asegura de no ir por debajo de la primera página
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    return (
        <section className={styles.popularSection}>
            <div className={styles.header}>
                <h2 className={styles.sectionTitle}>{title || 'Populares'}</h2>
                {/* Botones de navegación del carrusel */}
                {totalPages > 1 && (
                    <div className={styles.navButtons}>
                        <button onClick={handlePrevPage} disabled={currentPage === 0} className={styles.navButton} aria-label="Anterior">
                            &#8249;
                        </button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className={styles.navButton} aria-label="Siguiente">
                            &#8250;
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.grid}>
                {currentBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </section>
    );
};

export default PopularBooksGrid;