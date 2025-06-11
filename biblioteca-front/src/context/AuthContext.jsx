import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService'; // Nuestro servicio de autenticación
import axios from 'axios'; // Para configurar/limpiar cabeceras globales

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Objeto del usuario: { nombre, correo, rol }
    const [token, setToken] = useState(localStorage.getItem('userToken')); // Token JWT
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userToken')); // Booleano
    const [loading, setLoading] = useState(true); // Para la carga inicial del estado de auth

    useEffect(() => {
        // Al cargar la app, intentar cargar el usuario y token desde localStorage
        const storedToken = localStorage.getItem('userToken');
        const storedUserDataString = localStorage.getItem('userData');

        if (storedToken && storedUserDataString) {
            try {
                const storedUserData = JSON.parse(storedUserDataString);
                setUser(storedUserData);
                setToken(storedToken);
                setIsAuthenticated(true);
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                console.log("AuthContext: User session restored from localStorage", storedUserData);
            } catch (e) {
                console.error("AuthContext: Error parsing stored user data, logging out.", e);
                // Si hay error, limpiamos por si acaso
                localStorage.removeItem('userToken');
                localStorage.removeItem('userData');
                delete axios.defaults.headers.common['Authorization'];
            }
        }
        setLoading(false); // Terminó la carga inicial del estado de auth
    }, []);

    const login = (loginResponseData) => {
        // loginResponseData es el objeto que devuelve authService.login,
        // que a su vez es response.data del backend (token, correo, nombre, rol)
        if (loginResponseData && loginResponseData.token) {
            const userData = {
                correo: loginResponseData.correo,
                nombre: loginResponseData.nombre,
                rol: loginResponseData.rol,
            };
            localStorage.setItem('userToken', loginResponseData.token);
            localStorage.setItem('userData', JSON.stringify(userData));
            axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponseData.token}`;

            setUser(userData);
            setToken(loginResponseData.token);
            setIsAuthenticated(true);
            console.log("AuthContext: User logged in", userData);
        } else {
            console.error("AuthContext: Login called with invalid data", loginResponseData);
        }
    };

    const logout = () => {
        authService.logout(); // Esto limpia localStorage y el header de Axios
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        console.log("AuthContext: User logged out");
        // Aquí podrías redirigir al home o login si es necesario,
        // aunque la redirección también se puede manejar en el componente que llama a logout.
    };

    // No renderizar nada hasta que el estado de autenticación inicial esté cargado
    if (loading) {
        return <div>Cargando sesión...</div>; // O un spinner, o null
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, loadingAuth: loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el AuthContext más fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};