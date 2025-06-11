package com.biblioteca.biblioteca_api.dto;

import com.biblioteca.biblioteca_api.model.Prestamo; // Importamos la entidad
import java.time.LocalDate;

public record PrestamoResponse(
        Long idPrestamo,
        Long idLibro,
        String tituloLibro,
        String portadaLibro,
        LocalDate fechaPrestamo,
        LocalDate fechaDevolucionEstimada,
        LocalDate fechaDevolucionReal
) {
    /**
     * Método de fábrica estático para convertir una entidad Prestamo a un PrestamoResponse DTO.
     * Esto ayuda a mantener la lógica de conversión en un solo lugar.
     */
    public static PrestamoResponse fromEntity(Prestamo prestamo) {
        return new PrestamoResponse(
                prestamo.getId(),
                prestamo.getLibro().getId(),
                prestamo.getLibro().getTitulo(),
                prestamo.getLibro().getPortada(),
                prestamo.getFechaPrestamo(),
                prestamo.getFechaDevolucionEstimada(),
                prestamo.getFechaDevolucionReal()
        );
    }
}