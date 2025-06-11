import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoanCard.module.css'; // Asegúrate de tener un archivo CSS con los estilos necesarios


const LoanCard = ({ loan, onReturn }) => {
    const placeholderImage = 'https://via.placeholder.com/150x220.png?text=No+Cover';

    const isReturned = !!loan.fechaDevolucionReal;
    const statusText = isReturned 
        ? `Devuelto el ${new Date(loan.fechaDevolucionReal).toLocaleDateString()}` 
        : 'En préstamo';

    return (
        <div className={`${styles.loanCard} ${isReturned ? styles.returned : ''}`}>
            <Link to={`/book/${loan.idLibro}`}>
                <img 
                    src={loan.portadaLibro || placeholderImage} 
                    alt={loan.tituloLibro}
                    className={styles.bookCover}
                />
            </Link>
            <div className={styles.loanDetails}>
                <h3 className={styles.bookTitle}>{loan.tituloLibro}</h3>
                <p><strong>Fecha de Préstamo:</strong> {new Date(loan.fechaPrestamo).toLocaleDateString()}</p>
                <p><strong>Fecha de Devolución Estimada:</strong> {new Date(loan.fechaDevolucionEstimada).toLocaleDateString()}</p>
                <div className={`${styles.status} ${isReturned ? styles.statusReturned : styles.statusActive}`}>
                    {statusText}
                </div>
                {!isReturned && (
                    <button onClick={() => onReturn(loan.idPrestamo)} className={styles.returnButton}>Marcar como Devuelto</button>
                )}
            </div>
        </div>
    );
};

export default LoanCard;