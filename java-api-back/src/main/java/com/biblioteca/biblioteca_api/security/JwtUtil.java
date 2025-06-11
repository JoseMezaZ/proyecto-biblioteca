package com.biblioteca.biblioteca_api.security; // O el paquete que hayas elegido

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value; // Para leer desde application.properties
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import io.jsonwebtoken.Claims;

@Component
public class JwtUtil {

    @Value("${jwt.secret}") // Lo leeremos desde application.properties
    private String secretString;

    @Value("${jwt.expiration.ms}") // Tiempo de expiración en milisegundos
    private long expirationTimeMs;

    private Key secretKey;

    @PostConstruct
    public void init() {
        // Es importante que el 'secretString' sea suficientemente largo y seguro para HS256
        // Para producción, este secreto debe ser mucho más robusto y manejado de forma segura.
        if (secretString == null || secretString.length() < 32) {
            // Una cadena de 32 bytes (256 bits) como mínimo para HS256
            System.err.println("ADVERTENCIA: El secreto JWT es demasiado corto o no está configurado. Usando uno por defecto NO SEGURO.");
            this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Genera una clave segura por defecto si no hay una
        } else {
            this.secretKey = Keys.hmacShaKeyFor(secretString.getBytes());
        }
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<io.jsonwebtoken.Claims, T> claimsResolver) {
        final io.jsonwebtoken.Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private io.jsonwebtoken.Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // Puedes añadir más información (claims) al token si lo necesitas
        // por ejemplo, roles: claims.put("roles", userDetails.getAuthorities());
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject) // Usualmente el nombre de usuario o correo
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTimeMs))
                .signWith(secretKey, SignatureAlgorithm.HS256) // Usamos HS256
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}