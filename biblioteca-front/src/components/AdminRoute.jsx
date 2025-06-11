
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { isAuthenticated, user, loadingAuth } = useAuth();

    if (loadingAuth) {
        // Muestra un loader mientras se verifica el estado de autenticación
        return <div>Verificando autenticación...</div>;
    }

    if (isAuthenticated && user?.rol === 'ADMINISTRADOR') {
        // Si el usuario está autenticado Y es administrador, permite el acceso
        return <Outlet />;
    }

    if (isAuthenticated && user?.rol !== 'ADMINISTRADOR') {
        // Si está logueado pero NO es admin, redirige al inicio (o a una página de "Acceso Denegado")
        console.log("Acceso denegado: Se requiere rol de administrador.");
        return <Navigate to="/" replace />;
    }

    // Si no está autenticado, redirige a login
    return <Navigate to="/login" replace />;
};

export default AdminRoute;