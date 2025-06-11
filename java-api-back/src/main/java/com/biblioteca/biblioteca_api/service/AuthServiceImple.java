package com.biblioteca.biblioteca_api.service;

import com.biblioteca.biblioteca_api.dto.LoginRequest;
import com.biblioteca.biblioteca_api.dto.LoginResponse;
import com.biblioteca.biblioteca_api.dto.RegisterRequest;
import com.biblioteca.biblioteca_api.model.Usuario;
import com.biblioteca.biblioteca_api.repository.UsuarioRepository;
import com.biblioteca.biblioteca_api.security.JwtUtil; // NUEVO IMPORT
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager; // NUEVO IMPORT
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; // NUEVO IMPORT
import org.springframework.security.core.Authentication; // NUEVO IMPORT
import org.springframework.security.core.context.SecurityContextHolder; // NUEVO IMPORT
import org.springframework.security.core.userdetails.UserDetails; // NUEVO IMPORT
import org.springframework.security.core.userdetails.UsernameNotFoundException; // NUEVO IMPORT
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImple implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager; // NUEVA INYECCIÓN
    private final JwtUtil jwtUtil;                         // NUEVA INYECCIÓN

    @Autowired
    public AuthServiceImple(UsuarioRepository usuarioRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager, // NUEVO
                           JwtUtil jwtUtil) {                         // NUEVO
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Usuario registrarUsuario(RegisterRequest registerRequest) throws RuntimeException {

        if (usuarioRepository.existsByCorreo(registerRequest.getCorreo())) {
            throw new RuntimeException("Error: El correo electrónico ya está en uso!");
        }
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(registerRequest.getNombre());
        nuevoUsuario.setCorreo(registerRequest.getCorreo());
        nuevoUsuario.setContrasena(registerRequest.getContrasena());
        nuevoUsuario.setRol("USUARIO");
        return usuarioRepository.save(nuevoUsuario);
    }

    // --- NUEVO MÉTODO DE LOGIN ---
    @Override
    public LoginResponse loginUsuario(LoginRequest loginRequest) throws RuntimeException {
        try {
            // Autenticamos con Spring Security
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.correo(), loginRequest.contrasena())
            );

            // Si la autenticación es exitosa, el contexto de seguridad se actualiza
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Obtenemos los detalles del usuario autenticado (necesitaremos UserDetailsService más adelante para que esto funcione bien)
            // Por ahora, asumimos que el 'principal' es UserDetails o podemos buscar el usuario de nuevo.
            // Para que funcione con nuestra implementación actual de JsonUsuarioRepository,
            // necesitamos un UserDetailsService que use nuestro repositorio.
            // ¡Vamos a añadir un UserDetailsService simple!

            // Buscamos el usuario en nuestro repositorio para obtener sus detalles (nombre, rol)
            // Spring Security usa UserDetailsService para obtener el UserDetails, pero para obtener nuestro objeto Usuario completo:
            Usuario usuario = usuarioRepository.findByCorreo(loginRequest.correo())
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con correo: " + loginRequest.correo()));

            // Creamos un UserDetails simple para la generación del token (Spring Security lo haría internamente si UserDetailsService está bien configurado)
            UserDetails userDetails = org.springframework.security.core.userdetails.User
                    .withUsername(usuario.getCorreo())
                    .password(usuario.getContrasena()) // La contraseña ya está hasheada en BD
                    .authorities(usuario.getRol()) // O Collection<GrantedAuthority>
                    .build();

            // Generamos el token JWT
            String token = jwtUtil.generateToken(userDetails);

            return new LoginResponse(token, usuario.getCorreo(), usuario.getNombre(), usuario.getRol());

        } catch (Exception e) {
            // Spring Security lanza BadCredentialsException si las credenciales son incorrectas
            System.err.println("Error de autenticación: " + e.getMessage());
            throw new RuntimeException("Error: Credenciales inválidas.", e);
        }
    }
}