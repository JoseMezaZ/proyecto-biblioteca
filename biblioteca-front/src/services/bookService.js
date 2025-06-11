import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Asegúrate de que esta URL es correcta

const getAllBooks = () => {
    return axios.get(`${API_URL}/libros`);
};

const getBookById = (id) => {
    const url = `${API_URL}/libros/${id}`; 
    return axios.get(url);
};

const searchBooks = (query) => {
    return axios.get(`${API_URL}/libros/search`, {
        params: {
            q: query 
        }
    });
};

const deleteBook = (id) => {
    return axios.delete(`${API_URL}/libros/${id}`);
};

const createBook = (bookData) => {
    return axios.post(`${API_URL}/libros`, bookData);
};

const updateBook = (id, bookData) => {
    return axios.put(`${API_URL}/libros/${id}`, bookData);
};

const bookService = {
    getAllBooks,
    getBookById,
    searchBooks, 
    deleteBook, 
    createBook,
    updateBook,
};

export default bookService;