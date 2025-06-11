import React, { useState, useEffect, useMemo } from 'react';
import bookService from '../../services/bookService';
import BookCard from '../../components/BookCard/BookCard';
import Pagination from '../../components/pagination/Pagination';
import styles from './NewArrivalsPage.module.css'; // Usa sus propios estilos (que son una copia)

const ITEMS_PER_PAGE = 10;

const NewArrivalsPage = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        bookService.getAllBooks()
            .then(response => {
                // --- CAMBIO EN LA LÓGICA AQUÍ ---
                // En lugar de ordenar, filtramos los libros que son novedad
                const newArrivals = response.data.filter(book => book.novedad === true);
                setAllBooks(newArrivals);
                // ---------------------------------
            })
            .catch(err => {
                console.error("Error al cargar las novedades:", err);
                setError("No se pudo cargar la lista de novedades.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // El resto de la lógica de paginación funciona igual sobre la lista ya filtrada
    const totalPages = Math.ceil(allBooks.length / ITEMS_PER_PAGE);
    const currentBooks = allBooks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <p className={styles.statusMessage}>Cargando novedades...</p>;
    if (error) return <p className={styles.statusMessageError}>{error}</p>;

    return (
        <div className={styles.pageContainer}>
            {/* --- CAMBIAMOS LOS TEXTOS --- */}
            <h1>Novedades</h1>
            <p>Descubre los últimos libros añadidos a nuestro catálogo.</p>

            {allBooks.length > 0 ? (
                <>
                    <div className={styles.booksGrid}>
                        {currentBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <p>No hay novedades para mostrar en este momento.</p>
            )}
        </div>
    );
};

export default NewArrivalsPage;