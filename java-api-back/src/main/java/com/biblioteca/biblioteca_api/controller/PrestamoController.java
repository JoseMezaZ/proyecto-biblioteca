package com.biblioteca.biblioteca_api.controller;

import com.biblioteca.biblioteca_api.dto.PrestamoRequest; // Usaremos un DTO para la solicitud
import com.biblioteca.biblioteca_api.model.Prestamo;
import com.biblioteca.biblioteca_api.service.PrestamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication; // Para obtener el usuario autenticado
import org.springframework.web.bind.annotation.*;
import com.biblioteca.biblioteca_api.dto.PrestamoResponse;
import java.util.List;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {

    @Autowired
    private PrestamoService prestamoService;

    @PostMapping
    public ResponseEntity<?> crearPrestamo(@RequestBody PrestamoRequest prestamoRequest, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado.");
        }

        // Obtenemos el correo del usuario del objeto Authentication
        String usuarioCorreo = authentication.getName();

        try {
            Prestamo nuevoPrestamo = prestamoService.crearPrestamo(prestamoRequest.getIdLibro(), usuarioCorreo);
            // Por ahora devolvemos el objeto Prestamo creado. Más adelante podríamos crear un PrestamoResponse DTO.
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPrestamo);
        } catch (Exception e) {
            // Captura las excepciones de la capa de servicio (ej. libro no disponible)
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/mis-prestamos")
    public ResponseEntity<List<PrestamoResponse>> obtenerMisPrestamos(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String usuarioCorreo = authentication.getName();
        List<PrestamoResponse> misPrestamos = prestamoService.obtenerPrestamosPorUsuario(usuarioCorreo);
        return ResponseEntity.ok(misPrestamos);
    }

    @PutMapping("/{idPrestamo}/devolver")
    public ResponseEntity<?> devolverLibro(@PathVariable Long idPrestamo, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado.");
        }

        String usuarioCorreo = authentication.getName();

        try {
            Prestamo prestamoActualizado = prestamoService.devolverLibro(idPrestamo, usuarioCorreo);

            // --- CORRECCIÓN AQUÍ ---
            // Convertimos la entidad Prestamo a nuestro DTO PrestamoResponse antes de enviarla
            PrestamoResponse respuestaDTO = PrestamoResponse.fromEntity(prestamoActualizado);

            return ResponseEntity.ok(respuestaDTO); // Devolvemos el DTO
            // -----------------------

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}