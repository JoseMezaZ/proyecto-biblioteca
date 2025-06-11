import axios from 'axios';

// const API_AUTH_URL = 'http://localhost:8080/api/auth'; // <-- BORRA O COMENTA
const API_AUTH_URL = `${import.meta.env.VITE_API_URL}/auth`; // <-- USA ESTA

const register = (nombre, correo, contrasena) => {
    return axios.post(`${API_AUTH_URL}/register`, {
        nombre,
        correo,
        contrasena
    });
};

const login = async (correo, contrasena) => {
    try {
        const response = await axios.post(`${API_AUTH_URL}/login`, {
            correo,
            contrasena
        });
        if (response.data && response.data.token) {
            // Guardamos el token y los datos del usuario en localStorage
            localStorage.setItem('userToken', response.data.token);
            // Guardamos un objeto de usuario con nombre, correo y rol
            const userData = {
                correo: response.data.correo,
                nombre: response.data.nombre,
                rol: response.data.rol
            };
            localStorage.setItem('userData', JSON.stringify(userData));

            // Opcional: Configurar el token en las cabeceras de Axios para futuras peticiones
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            console.log("Login successful, token and user data stored.");
            console.log("User Data:", userData);
            console.log("Token:", response.data.token);
        }
        return response.data; // Devolvemos la respuesta completa (que incluye el token y datos del usuario)
    } catch (error) {
        // Si hay un error, el token y userData no se guardan/actualizan.
        // Limpiamos cualquier token/usuario antiguo si el login falla
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        delete axios.defaults.headers.common['Authorization'];
        console.error("Login failed:", error.response ? error.response.data : error.message);
        throw error; // Re-lanzamos el error para que el componente lo maneje
    }
};

const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    delete axios.defaults.headers.common['Authorization']; // Elimina el token de las cabeceras de Axios
    console.log("User logged out, token and user data removed.");
    // Aquí podrías notificar al backend si es necesario (ej. invalidar token en servidor)
};

const getCurrentUser = () => {
    const token = localStorage.getItem('userToken');
    const userDataString = localStorage.getItem('userData');
    if (token && userDataString) {
        try {
            return JSON.parse(userDataString);
        } catch (e) {
            console.error("Error parsing user data from localStorage", e);
            return null;
        }
    }
    return null;
};

// Función para configurar el token en Axios al cargar la app si existe
const setupAxiosInterceptors = () => {
    const token = localStorage.getItem('userToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};


const authService = {
    register,
    login,
    logout,
    getCurrentUser,
    setupAxiosInterceptors
};

export default authService;