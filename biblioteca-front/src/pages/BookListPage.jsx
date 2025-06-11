import React, { useState, useEffect, useMemo } from 'react';
import bookService from '../services/bookService';
import BookCard from '../components/BookCard/BookCard';
import Pagination from '../components/pagination/Pagination'; // 
import styles from './BookListPage.module.css'; 


const ITEMS_PER_PAGE = 10; // ¿Cuántos libros quieres mostrar por página?

const BookListPage = () => {
    const [allBooks, setAllBooks] = useState([]); // Guarda TODOS los libros
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- NUEVOS ESTADOS PARA PAGINACIÓN ---
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        bookService.getAllBooks()
            .then(response => {
                setAllBooks(response.data);
            })
            .catch(err => {
                console.error("Error al cargar el catálogo:", err);
                setError("No se pudo cargar el catálogo de libros.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // Se ejecuta solo una vez para cargar todos los libros

    // --- LÓGICA DE PAGINACIÓN ---
    const totalPages = Math.ceil(allBooks.length / ITEMS_PER_PAGE);
    const indexOfLastBook = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstBook = indexOfLastBook - ITEMS_PER_PAGE;
    const currentBooks = allBooks.slice(indexOfFirstBook, indexOfLastBook);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // -----------------------------

    if (loading) return <p className={styles.statusMessage}>Cargando catálogo...</p>;
    if (error) return <p className={styles.statusMessageError}>{error}</p>;

    return (
        <div className={styles.catalogContainer}>
            <h1>Catálogo de Libros</h1>
            <p>Explora nuestra colección completa.</p>

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
                <p>No hay libros en el catálogo en este momento.</p>
            )}
        </div>
    );
};

export default BookListPage;