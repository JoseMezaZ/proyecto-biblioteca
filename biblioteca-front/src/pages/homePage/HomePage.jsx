import React, { useState, useEffect } from 'react';
import bookService from '../../services/bookService';
import PopularBooksGrid from './components/PopularBooksGrid';
import BookCarousel from './components/BookCarousel'; // Reutilizamos el BookCarousel
// Importaremos HighlightBookCarousel en lugar de HighlightBook directamente aquí
import HighlightBookCarousel from './components/HighlightBookCarousel'; // NUEVO: Crearemos este componente
import styles from './HomePage.module.css'; // Crearemos este archivo CSS

const HomePage = () => {
    const [popularBooks, setPopularBooks] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [highlightedBooks, setHighlightedBooks] = useState([]); // CAMBIO: Ahora es un array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHomePageData = async () => {
            try {
                setLoading(true);
                const response = await bookService.getAllBooks();
                const allBooks = response.data;

                if (allBooks && allBooks.length > 0) {
                    // Lógica para "Populares" (sin cambios)
                    const sortedByPopularity = [...allBooks].sort((a, b) => (b.cantidadBusquedas || 0) - (a.cantidadBusquedas || 0));
                    setPopularBooks(sortedByPopularity.slice(0, 18));

                    // Lógica para "Novedades" (sin cambios)
                    const arrivals = allBooks.filter(book => book.novedad === true);
                    setNewArrivals(arrivals.slice(0, 7));

                    // Lógica para "Libros Destacados" (obtenemos todos los marcados)
                    const featured = allBooks.filter(book => book.destacado === true);
                    if (featured.length > 0) {
                        setHighlightedBooks(featured);
                    } else if (sortedByPopularity.length > 0) {
                        // Fallback: si ninguno está marcado, destacamos el más popular
                        setHighlightedBooks([sortedByPopularity[0]]);
                    } else if (allBooks.length > 0) {
                         // Fallback extremo: el primer libro de la lista
                        setHighlightedBooks([allBooks[0]]);
                    } else {
                        setHighlightedBooks([]); // Ningún libro para destacar
                    }
                }
                setError(null);
            } catch (err) {
                console.error("Error fetching books for homepage:", err);
                setError(err.message || 'Error al cargar datos para la página de inicio.');
            } finally {
                setLoading(false);
            }
        };

        fetchHomePageData();
    }, []);

    if (loading) {
        return <div className={styles.statusMessage}>Cargando página de inicio...</div>;
    }

    if (error) {
        return <div className={styles.statusMessageError}>Error: {error}</div>;
    }

    return (
        <div className={styles.homePageContainer}>
            {/* Carrusel de Libros Destacados */}
            {highlightedBooks.length > 0 && <HighlightBookCarousel books={highlightedBooks} />}

            {/* Sección de Novedades */}
            <BookCarousel books={newArrivals} title="Novedades" />

            {/* Sección de Populares */}
            <PopularBooksGrid books={popularBooks} title="Los Más Populares" />
        </div>
    );
};

export default HomePage;