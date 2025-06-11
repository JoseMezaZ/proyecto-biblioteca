import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from '../userAvatar/UserAvatar';
import styles from './ProfileDropdown.module.css';

const ProfileDropdown = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false); // Cierra el menú al cerrar sesión
    };

    // Efecto para cerrar el menú si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    if (!user) return null;

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <button className={styles.dropdownToggle} onClick={() => setIsOpen(!isOpen)}>
                <UserAvatar name={user.nombre} />
                <span className={styles.userName}>{user.nombre}</span>
                <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <Link to="/profile" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Mi Perfil</Link>
                    {user.rol === 'USUARIO' && (
                        <Link to="/mis-prestamos" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Mis Préstamos</Link>
                    )}
                    {user.rol === 'ADMINISTRADOR' && (
                        <Link to="/admin" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Panel Admin</Link>
                    )}
                    <div className={styles.dropdownDivider}></div>
                    <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutButton}`}>
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;