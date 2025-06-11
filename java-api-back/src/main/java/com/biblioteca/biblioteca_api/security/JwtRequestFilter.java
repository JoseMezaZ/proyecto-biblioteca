package com.biblioteca.biblioteca_api.security;

import com.biblioteca.biblioteca_api.service.CustomUserDetailsService; // Tu servicio de detalles de usuario
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("\n--- [JwtRequestFilter] Interceptando Petición: " + request.getRequestURI() + " ---");

        final String authorizationHeader = request.getHeader("Authorization");
        System.out.println("[JwtRequestFilter] Cabecera 'Authorization': " + authorizationHeader);

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            System.out.println("[JwtRequestFilter] Token JWT extraído: " + jwt);
            try {
                username = jwtUtil.extractUsername(jwt);
                System.out.println("[JwtRequestFilter] Username extraído del token: " + username);
            } catch (Exception e) {
                System.err.println("[JwtRequestFilter] ERROR al extraer username del token: " + e.getMessage());
            }
        } else {
            System.out.println("[JwtRequestFilter] La cabecera 'Authorization' no existe o no empieza con 'Bearer '.");
        }

        if (username != null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwt, userDetails)) {
                System.out.println("[JwtRequestFilter] ¡Token VÁLIDO! Configurando autenticación en el contexto.");
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            } else {
                System.err.println("[JwtRequestFilter] ¡Token INVÁLIDO!");
            }
        }

        System.out.println("--- [JwtRequestFilter] Petición continúa por la cadena de filtros. ---");
        filterChain.doFilter(request, response);
    }
}