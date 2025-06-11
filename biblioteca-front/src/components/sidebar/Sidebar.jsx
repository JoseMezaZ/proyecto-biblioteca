
import { Link, NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';
// Importamos los iconos
import { FaHome, FaBook, FaStar, FaFire, FaUserCog, FaTachometerAlt, FaBookOpen } from 'react-icons/fa';



const Sidebar = () => {
    const { isAuthenticated, user } = useAuth(); 

    const getLinkClass = ({ isActive }) => {
        return isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;
    };

    return (
        <aside className={styles.sidebar}>
                <Link to="/" className={styles.brandLogo}>
                    <img src={logo} alt="Logo de la Biblioteca" className={styles.logoImage} />
                </Link> 
            <nav>
                <ul>
                    <li><NavLink to="/" className={getLinkClass} end><FaHome className={styles.navIcon} /><span className={styles.navText}>Inicio</span></NavLink></li>
                    <li><NavLink to="/catalog" className={getLinkClass}><FaBookOpen className={styles.navIcon} /><span className={styles.navText}>Catálogo</span></NavLink></li>

                    <li>
                        <NavLink to="/popular" className={getLinkClass}><FaFire className={styles.navIcon} />
                        <span className={styles.navText}>Populares</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/new-arrivals" className={getLinkClass}><FaStar className={styles.navIcon} />
                        <span className={styles.navText}>Novedades</span>
                        </NavLink>
                    </li>

                    {isAuthenticated && user?.rol === 'USUARIO' && (
                         <li><NavLink to="/mis-prestamos" className={getLinkClass}><FaBook className={styles.navIcon} /><span className={styles.navText}>Mis Préstamos</span></NavLink></li>
                    )}

                    {isAuthenticated && user?.rol === 'ADMINISTRADOR' && (
                        <>
                            <li><NavLink to="/admin" className={getLinkClass}end><FaUserCog className={styles.navIcon} /><span className={styles.navText}>Gestión Libros</span></NavLink></li>
                            <li><NavLink to="/admin/dashboard" className={getLinkClass}><FaTachometerAlt className={styles.navIcon} /><span className={styles.navText}>Dashboard</span></NavLink></li>
                        </>
                    )}
                </ul>
            </nav>
            {/* ... (footer sin cambios) ... */}
        </aside>
    );
};

export default Sidebar;