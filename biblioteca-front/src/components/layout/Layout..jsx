
import Sidebar from '../Sidebar/Sidebar'; // Crearemos este componente a continuación
import Header from '../Header/Header';   // Y este también
import styles from './Layout.module.css';
import Footer from '../footer/Footer';


const Layout = ({ children }) => {
    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Header />
                <main className={styles.pageContent}>
                    {children} 
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;