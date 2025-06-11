import React, { useState, useEffect } from 'react';
import prestamoService from '../../services/prestamoService';
import LoanCard from '../../components/loanCard/LoanCard';
import styles from './MyLoansPage.module.css';

const MyLoansPage = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        prestamoService.obtenerMisPrestamos()
            .then(response => {
                setLoans(response.data);
            })
            .catch(err => {
                console.error("Error al obtener los préstamos:", err);
                setError("No se pudieron cargar tus préstamos. Inténtalo de nuevo más tarde.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // Se ejecuta solo una vez al montar el componente

     const handleReturnBook = (loanId) => {
        if (!window.confirm("¿Estás seguro de que quieres devolver este libro?")) {
            return;
        }

        prestamoService.devolverLibro(loanId)
            .then(response => {
                alert("¡Libro devuelto con éxito!");
                setLoans(prevLoans => prevLoans.map(loan => 
                    loan.idPrestamo === loanId 
                        ? { ...loan, fechaDevolucionReal: response.data.fechaDevolucionReal } 
                        : loan
                ));
            })
            .catch(err => {
                console.error("Error al devolver el libro:", err);
                alert(err.response?.data || "Ocurrió un error al devolver el libro.");
            });
    };


    if (loading) return <p className={styles.statusMessage}>Cargando tus préstamos...</p>;
    if (error) return <p className={styles.statusMessageError}>{error}</p>;

    return (
        <div className={styles.myLoansContainer}>
            <h1>Mis Préstamos</h1>
            {loans.length === 0 ? (
                <p>Aún no has solicitado ningún préstamo.</p>
            ) : (
                <div className={styles.loansList}>
                    {loans.map(loan => (
                        <LoanCard 
                            key={loan.idPrestamo} 
                            loan={loan} 
                            onReturn={handleReturnBook} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyLoansPage;