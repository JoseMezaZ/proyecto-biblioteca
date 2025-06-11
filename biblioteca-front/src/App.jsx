
// ¡IMPORTANTE! Asegúrate de importar Outlet
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Importamos AMBOS layouts
import Layout from './components/layout/Layout.';

// Importamos los componentes de protección de rutas
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Importamos todas las páginas
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage/BookDetailPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import AdminPage from './pages/AdminPage/AdminPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import AddBookPage from './pages/AddBookPage/AddBookPage';
import EditBookPage from './pages/EditBookPage/EditBookPage';
import MyLoansPage from './pages/MyLoansPage/MyLoansPage';
import PopularBooksPage from './pages/popularBooksPage/PopularBooksPage';
import NewArrivalsPage from './pages/newArrivalsPage/NewArrivalsPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* TODAS las rutas ahora viven dentro de este Layout principal */}
                <Route path="/" element={<Layout><Outlet /></Layout>}>
                    {/* Rutas Públicas */}
                    <Route index element={<HomePage />} /> {/* 'index' marca esta como la ruta por defecto para '/' */}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="catalog" element={<BookListPage />} />
                    <Route path="popular" element={<PopularBooksPage />} />
                    <Route path="new-arrivals" element={<NewArrivalsPage />} />
                    <Route path="search" element={<SearchResultsPage />} />
                    <Route path="book/:bookId" element={<BookDetailPage />} />

                    {/* Rutas Protegidas */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="profile" element={<UserProfilePage />} />
                        <Route path="mis-prestamos" element={<MyLoansPage />} />
                    </Route>

                    {/* Rutas de Admin */}
                    <Route element={<AdminRoute />}>
                        <Route path="admin" element={<AdminPage />} />
                        <Route path="admin/dashboard" element={<DashboardPage />} />
                        <Route path="admin/libros/nuevo" element={<AddBookPage />} />
                        <Route path="admin/libros/editar/:bookId" element={<EditBookPage />} />
                    </Route>

                    {/* Ruta para páginas no encontradas */}
                    <Route path="*" element={<div><h1>404 - Página No Encontrada</h1></div>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;