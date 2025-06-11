import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import styles from './RegisterPage.module.css';
import layoutStyles from '../../components/Layout/Layout.module.css'; // Importa los estilos del Layout

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setServerError('');
        setSuccessMessage('');
        try {
            // El DTO en el backend espera nombre, correo, contrasena
            await authService.register(data.nombre, data.correo, data.contrasena);
            setSuccessMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
            // Opcional: Redirigir a la página de login después de un momento
            setTimeout(() => {
                navigate('/login'); // Crearemos esta ruta más adelante
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                // Asumimos que el backend devuelve el mensaje de error en error.response.data
                // (como "Error: El correo electrónico ya está en uso!")
                setServerError(error.response.data);
            } else {
                setServerError('Error al registrar el usuario. Inténtalo de nuevo.');
            }
            console.error('Error en el registro:', error);
        }
    };

    return (
        <div className={layoutStyles.centeredContent}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
                <h2>Crear una Cuenta</h2>

                {serverError && <p className={styles.errorMessage}>{serverError}</p>}
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

                <div className={styles.formGroup}>
                    <label htmlFor="nombre">Nombre Completo</label>
                    <input
                        type="text"
                        id="nombre"
                        {...register("nombre", { required: "El nombre es obligatorio" })}
                    />
                    {errors.nombre && <p className={styles.validationError}>{errors.nombre.message}</p>}
                </div>

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
                        {...register("contrasena", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres"
                            }
                        })}
                    />
                    {errors.contrasena && <p className={styles.validationError}>{errors.contrasena.message}</p>}
                </div>

                <button type="submit" className={styles.submitButton}>Registrarse</button>

                <p className={styles.loginRedirect}>
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión aquí</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;