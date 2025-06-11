import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/prestamos'; // <-- BORRA O COMENTA
const API_URL = `${import.meta.env.VITE_API_URL}/prestamos`; // <-- USA ESTA

const solicitarPrestamo = (idLibro) => {
    return axios.post(API_URL, {
        idLibro: idLibro
    });
};

const obtenerMisPrestamos = () => {
    return axios.get(`${API_URL}/mis-prestamos`);
};

const devolverLibro = (idPrestamo) => {
    return axios.put(`${API_URL}/${idPrestamo}/devolver`);
};


const prestamoService = {
    solicitarPrestamo,
    obtenerMisPrestamos,
    devolverLibro,
};

export default prestamoService;