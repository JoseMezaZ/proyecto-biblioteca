import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, loadingAuth } = useAuth();
    const location = useLocation();

    if (loadingAuth) {
        // Muestra un loader mientras se verifica el estado de autenticación inicial
        // Esto evita un parpadeo o redirección prematura si se está cargando desde localStorage
        return <div>Verificando autenticación...</div>; // O un spinner más elegante
    }

    if (!isAuthenticated) {
        // Si no está autenticado, redirige a /login
        // Guardamos la ruta original en el estado de la location para poder redirigir de vuelta
        // después del login si queremos implementar esa funcionalidad.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si está autenticado, renderiza el componente hijo de la ruta (la página protegida)
    return <Outlet />;
};

export default ProtectedRoute;