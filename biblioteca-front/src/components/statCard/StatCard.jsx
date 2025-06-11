import React, { useState } from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ stat, imageSrc }) => {
    const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);

    const toggleAnalysis = () => {
        setIsAnalysisVisible(prevState => !prevState);
    };

    return (
        <div className={styles.statCard}>
            <h2>{stat.titulo}</h2>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <img src={imageSrc} alt={stat.titulo} />
                </div>
                <div className={styles.analysisSection}>
                    <button onClick={toggleAnalysis} className={styles.toggleButton}>
                        {isAnalysisVisible ? 'Ocultar Análisis' : 'Ver Análisis'}
                    </button>
                    {isAnalysisVisible && (
                        <div className={styles.analysisContainer}>
                            <h3>Análisis:</h3>
                            <p>{stat.analisis}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatCard;