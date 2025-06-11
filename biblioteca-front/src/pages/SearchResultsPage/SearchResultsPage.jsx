import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import bookService from '../../services/bookService'; // Importamos el servicio actualizado
import BookCard from '../../components/BookCard/BookCard'; // Para mostrar cada libro
import styles from './SearchResultsPage.module.css';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]); // Estado para los resultados
    const [loading, setLoading] = useState(false); // Estado para la carga
    const [error, setError] = useState(null); // Estado para errores

    useEffect(() => {
        if (query && query.trim() !== '') {
            setLoading(true);
            setError(null); // Resetea errores previos
            setResults([]); // Limpia resultados previos mientras carga

            bookService.searchBooks(query)
                .then(response => {
                    setResults(response.data);
                })
                .catch(err => {
                    console.error("Error searching books:", err);
                    setError("No se pudieron obtener los resultados de búsqueda. Inténtalo de nuevo más tarde.");
                    // Podrías ser más específico con el error si el backend devuelve un mensaje
                    // if (err.response && err.response.data && err.response.data.message) {
                    //     setError(err.response.data.message);
                    // }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setResults([]); // Limpiar resultados si no hay query o está vacía
            setError(null);
            setLoading(false);
        }
    }, [query]); // El efecto se ejecuta cada vez que 'query' cambia

    return (
        <div className={styles.resultsContainer}>
            <h1>Resultados de Búsqueda</h1>
            {query ? (
                <p>Mostrando resultados para: <strong>"{query}"</strong></p>
            ) : (
                <p>Por favor, ingresa un término de búsqueda en la barra superior.</p>
            )}

            {loading && <p>Buscando...</p>}
            {error && <p className={styles.errorText}>{error}</p>}

            {!loading && !error && results.length === 0 && query && (
                <p>No se encontraron libros que coincidan con "{query}".</p>
            )}

            {!loading && !error && results.length > 0 && (
                <div className={styles.resultsGrid}>
                    {results.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;