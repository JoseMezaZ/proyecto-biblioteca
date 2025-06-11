import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './UserProfilePage.module.css'; // Crearemos este archivo

const UserProfilePage = () => {
    const { user } = useAuth(); // Obtenemos la información del usuario del contexto

    if (!user) {
        // Esto no debería suceder si la ruta está protegida, pero por si acaso
        return <p>No se pudo cargar la información del perfil.</p>;
    }

    return (
    
        <div className={styles.pageWrapperForCentering}>
            <div className={styles.profileContainer}>
                <h1>Perfil de Usuario</h1>
                <div className={styles.profileDetails}>
                    <p><strong>Nombre:</strong> {user.nombre}</p>
                    <p><strong>Correo:</strong> {user.correo}</p>
                    <p><strong>Rol:</strong> {user.rol}</p>
                    {/* Aquí podríamos añadir más información o la opción de editar perfil más adelante */}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;