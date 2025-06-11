import React from 'react';
import BookCover from '../../../components/bookCover/BookCover'; // <-- Usamos el nuevo componente
import styles from './BookCarousel.module.css';

const BookCarousel = ({ books, title }) => {
    if (!books || books.length === 0) {
        return null;
    }

    return (
        <section className={styles.carouselSection}>
            <div className={styles.header}>
                <h2 className={styles.sectionTitle}>{title || 'Novedades'}</h2>
                {/* Podríamos añadir botones de scroll aquí con un poco más de JS si quisiéramos */}
            </div>
            <div className={styles.carouselContainer}>
                <div className={styles.carouselTrack}>
                    {books.map(book => (
                        <BookCover key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookCarousel;