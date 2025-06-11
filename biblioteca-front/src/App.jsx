
// ¡IMPORTANTE! Asegúrate de importar Outlet
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Importamos AMBOS layouts
import Layout from './components/layout/Layout.';

// Importamos los componentes de protección de rutas
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Importamos todas las páginas
import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import RegisterPage from './pages/registerPage/RegisterPage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/bookDetailPage/BookDetailPage';
import SearchResultsPage from './pages/searchResultsPage/SearchResultsPage';
import UserProfilePage from './pages/userProfilePage/UserProfilePage';
import AdminPage from './pages/adminPage/AdminPage';
import DashboardPage from './pages/dashboardPage/DashboardPage';
import AddBookPage from './pages/addBookPage/AddBookPage';
import EditBookPage from './pages/editBookPage/EditBookPage';
import MyLoansPage from './pages/myLoansPage/MyLoansPage';
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