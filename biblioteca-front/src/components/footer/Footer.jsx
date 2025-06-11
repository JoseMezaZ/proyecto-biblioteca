
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Usamos react-icons
import styles from './Footer.module.css';

    const Footer = () => {
        const currentYear = new Date().getFullYear();

        return (
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.copyright}>
                        &copy; {currentYear} Biblioteca Virtual. Todos los derechos reservados.
                    </div>
                    <div className={styles.footerLinks}>
                        <Link to="/">Sobre Nosotros</Link>
                        <Link to="/">Contacto</Link>
                        <Link to="/">Política de Privacidad</Link>
                    </div>
                    <div className={styles.socialIcons}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </footer>
        );
    };

    export default Footer;