import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from '../profileDropdown/ProfileDropdown';
import styles from './Header.module.css';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.leftSection}>
                    <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                        <div className={styles.searchBar}>
                            <span className={styles.searchIcon}>🔍</span>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                    </form>
                </div>

                <div className={styles.rightSection}>
                    <div className={styles.userActions}>
                        {isAuthenticated ? (
                            <ProfileDropdown />
                        ) : (
                            <>
                                <Link to="/login" className={styles.navLink}>Iniciar Sesión</Link>
                                <Link to="/register" className={styles.navLinkRegister}>Registrarse</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;