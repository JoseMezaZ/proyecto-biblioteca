import React from 'react';
import styles from './DashboardModal.module.css';

const DashboardModal = ({ stat, imageSrc, onClose }) => {
    // Si no hay stat, no renderizamos el modal.
    if (!stat) {
        return null;
    }

    // Maneja el clic en el fondo oscuro para cerrar el modal
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <h2>{stat.titulo}</h2>
                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                        <img src={imageSrc} alt={stat.titulo} />
                    </div>
                    <div className={styles.analysisContainer}>
                        <h3>Análisis:</h3>
                        <p>{stat.analisis}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardModal;