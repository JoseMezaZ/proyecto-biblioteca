import React, { useState, useEffect, useMemo } from 'react';
import bookService from '../../services/bookService';
import BookCard from '../../components/BookCard/BookCard';
import Pagination from '../../components/pagination/Pagination';
import styles from './PopularBooksPage.module.css'; // Su propio archivo de estilos

const ITEMS_PER_PAGE = 10;

const PopularBooksPage = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        bookService.getAllBooks()
            .then(response => {
                // Ordenamos los libros por popularidad al recibirlos
                const sortedBooks = response.data.sort((a, b) => (b.cantidadBusquedas || 0) - (a.cantidadBusquedas || 0));
                setAllBooks(sortedBooks);
            })
            .catch(err => {
                console.error("Error al cargar los libros populares:", err);
                setError("No se pudo cargar la lista de libros populares.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Lógica de Paginación
    const totalPages = Math.ceil(allBooks.length / ITEMS_PER_PAGE);
    const currentBooks = allBooks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <p className={styles.statusMessage}>Cargando libros populares...</p>;
    if (error) return <p className={styles.statusMessageError}>{error}</p>;

    return (
        <div className={styles.pageContainer}>
            <h1>Libros Más Populares</h1>
            <p>Descubre los títulos más solicitados por nuestra comunidad de lectores.</p>

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
                <p>No hay libros para mostrar en esta categoría.</p>
            )}
        </div>
    );
};

export default PopularBooksPage;