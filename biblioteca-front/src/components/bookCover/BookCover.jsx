import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BookCover.module.css';

const BookCover = ({ book }) => {
    const placeholderImage = 'https://via.placeholder.com/150x220.png?text=No+Cover';

    return (
        <Link to={`/book/${book.id}`} className={styles.coverLink}>
            <img 
                src={book.portada || placeholderImage} 
                alt={book.titulo}
                className={styles.coverImage}
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
            />
        </Link>
    );
};

export default BookCover;