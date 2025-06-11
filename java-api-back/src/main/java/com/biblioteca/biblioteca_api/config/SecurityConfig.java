package com.biblioteca.biblioteca_api.config;

import com.biblioteca.biblioteca_api.security.JwtRequestFilter; //
import org.springframework.beans.factory.annotation.Autowired; //
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy; //
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.http.HttpMethod;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired //
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // En SecurityConfig.java

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // --- Endpoints Públicos (no se necesita token) ---
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/libros/**").permitAll() // Ver libros es público

                        // --- Endpoints que requieren Autenticación (cualquier usuario logueado) ---
                        .requestMatchers("/api/prestamos/**").authenticated()
                        .requestMatchers("/profile").authenticated() // Si tienes una ruta de perfil

                        // --- Endpoints que requieren Rol de Administrador ---
                        .requestMatchers(HttpMethod.POST, "/api/libros").hasAuthority("ROLE_ADMINISTRADOR") // <-- Correcto para CREAR
                        .requestMatchers(HttpMethod.PUT, "/api/libros/**").hasAuthority("ROLE_ADMINISTRADOR") // <-- Correcto para ACTUALIZAR
                        .requestMatchers(HttpMethod.DELETE, "/api/libros/**").hasAuthority("ROLE_ADMINISTRADOR") // <-- Correcto para ELIMINAR

                        // --- Cualquier otra petición debe estar autenticada ---
                        .anyRequest().authenticated()
                );

        // Añadimos nuestro filtro JWT
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}