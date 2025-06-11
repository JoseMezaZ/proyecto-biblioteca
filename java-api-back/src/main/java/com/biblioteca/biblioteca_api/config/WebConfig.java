package com.biblioteca.biblioteca_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Aplica la configuración a todas las rutas bajo /api/
                .allowedOrigins(
                        "http://localhost:5173", // El origen de tu frontend Vite por defecto
                        "http://127.0.0.1:5173"   // A veces el navegador usa la IP, es bueno añadirlo
                        // Si en el futuro despliegas tu frontend en un dominio, deberás añadirlo aquí
                        // ej. "https://www.mibiblioteca.com"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos HTTP permitidos
                .allowedHeaders("*")    // Permite todas las cabeceras en la petición
                .allowCredentials(true); // Permite el envío de credenciales (ej. cookies, tokens de autorización)
    }


}