import React from 'react';
import styles from './UserAvatar.module.css';

const UserAvatar = ({ name }) => {
    // Obtiene las iniciales del nombre (ej. "Jose Perez" -> "JP")
    const getInitials = (name) => {
        if (!name) return '?';
        const words = name.split(' ');
        if (words.length > 1) {
            return words[0][0] + words[words.length - 1][0];
        }
        return name.substring(0, 2);
    };

    return (
        <div className={styles.avatar}>
            {getInitials(name).toUpperCase()}
        </div>
    );
};

export default UserAvatar;