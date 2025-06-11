package com.biblioteca.biblioteca_api.service;

import com.biblioteca.biblioteca_api.dto.PrestamoResponse;
import com.biblioteca.biblioteca_api.model.Prestamo;
import java.util.List;

public interface PrestamoService {
    // El método para crear un préstamo recibe el ID del libro y el correo del usuario que lo solicita
    Prestamo crearPrestamo(Long idLibro, String usuarioCorreo) throws Exception;
    List<PrestamoResponse> obtenerPrestamosPorUsuario(String usuarioCorreo);
    Prestamo devolverLibro(Long idPrestamo, String usuarioCorreo) throws Exception;
}