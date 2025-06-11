import React from 'react';
import styles from './StatPreviewCard.module.css';

const StatPreviewCard = ({ stat, imageSrc, onSelect }) => {
    return (
        <div className={styles.previewCard} onClick={onSelect}>
            <div className={styles.imageWrapper}>
                <img src={imageSrc} alt={`Miniatura de ${stat.titulo}`} />
            </div>
            <h4 className={styles.cardTitle}>{stat.titulo}</h4>
        </div>
    );
};

export default StatPreviewCard;