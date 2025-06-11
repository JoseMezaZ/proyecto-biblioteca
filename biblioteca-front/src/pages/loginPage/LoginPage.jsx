import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuth } from '../../context/AuthContext'; // IMPORTA useAuth
import styles from './LoginPage.module.css';
import layoutStyles from '../../components/layout/Layout.module.css'; // Asegúrate de que este archivo exista

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const { login: contextLogin } = useAuth(); // OBTÉN LA FUNCIÓN login DEL CONTEXTO

    const onSubmit = async (data) => {
        setServerError('');
        try {
            const loginResponse = await authService.login(data.correo, data.contrasena);
            // authService.login ya guarda en localStorage y configura Axios.
            // Ahora llamamos a contextLogin para actualizar el estado global.
            contextLogin(loginResponse); // Pasamos la respuesta completa (token, nombre, correo, rol)

            navigate('/'); // Redirige al inicio después del login
        } catch (error) {
            if (error.response && error.response.data) {
                setServerError(typeof error.response.data === 'string' ? error.response.data : error.response.data.message || "Error en el inicio de sesión.");
            } else {
                setServerError('Error al iniciar sesión. Verifica tus credenciales o inténtalo de nuevo.');
            }
            console.error('Error en el login:', error);
        }
    };

    return (
        <div className={layoutStyles.centeredContent}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
                <h2>Iniciar Sesión</h2>
                {/* ... (serverError, campos del formulario, botón, enlace de registro) ... */}
                 {serverError && <p className={styles.errorMessage}>{serverError}</p>}

                <div className={styles.formGroup}>
                    <label htmlFor="correo">Correo Electrónico</label>
                    <input
                        type="email"
                        id="correo"
                        {...register("correo", {
                            required: "El correo es obligatorio",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Formato de correo inválido"
                            }
                        })}
                    />
                    {errors.correo && <p className={styles.validationError}>{errors.correo.message}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="contrasena">Contraseña</label>
                    <input
                        type="password"
                        id="contrasena"
                        {...register("contrasena", { required: "La contraseña es obligatoria" })}
                    />
                    {errors.contrasena && <p className={styles.validationError}>{errors.contrasena.message}</p>}
                </div>

                <button type="submit" className={styles.submitButton}>Ingresar</button>

                <p className={styles.registerRedirect}>
                    ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;