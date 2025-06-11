import React, { useState, useEffect } from 'react';
import bookService from '../../services/bookService';
import styles from './AdminPage.module.css';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        setLoading(true);
        bookService.getAllBooks()
            .then(response => {
                setBooks(response.data);
            })
            .catch(err => {
                console.error("Error al cargar los libros:", err);
                setError("No se pudieron cargar los libros.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (bookId) => {
        // Pedimos confirmación antes de borrar
        if (window.confirm(`¿Estás seguro de que quieres eliminar el libro con ID ${bookId}?`)) {
            bookService.deleteBook(bookId)
                .then(() => {
                    alert('Libro eliminado con éxito.');
                    // Actualizamos la lista de libros en el estado para reflejar el cambio en la UI
                    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
                })
                .catch(err => {
                    console.error("Error al eliminar el libro:", err);
                    alert('Error al eliminar el libro. Es posible que el libro tenga préstamos asociados o ya no exista.');
                });
        }
    };

    if (loading) return <p className={styles.statusMessage}>Cargando libros...</p>;
    if (error) return <p className={styles.statusMessageError}>{error}</p>;

    return (
        <div className={styles.adminContainer}>
            <div className={styles.header}>
                <h1>Gestión de Libros</h1>
                <Link to="/admin/libros/nuevo" className={styles.addButton}> {/* <-- AÑADE ESTE BOTÓN/ENLACE */}
                    Añadir Nuevo Libro
                </Link>
            </div>
            <p>Aquí puedes ver, editar y eliminar los libros del catálogo.</p>

            <table className={styles.booksTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Portada</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Disponible</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>
                                <img src={book.portada} alt={book.titulo} className={styles.coverImage} />
                            </td>
                            <td>{book.titulo}</td>
                            <td>{book.autor}</td>
                            <td>
                                <span className={book.disponible ? styles.isAvailable : styles.isNotAvailable}>
                                    {book.disponible ? 'Sí' : 'No'}
                                </span>
                            </td>
                            <td>
                                <Link to={`/admin/libros/editar/${book.id}`} className={styles.actionButton}>Editar</Link>
                                <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => handleDelete(book.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;