package com.biblioteca.biblioteca_api.dto;

public class PrestamoRequest {
    private Long idLibro;

    // Constructor vacío (necesario para la deserialización de JSON)
    public PrestamoRequest() {
    }

    // Getters y Setters
    public Long getIdLibro() {
        return idLibro;
    }

    public void setIdLibro(Long idLibro) {
        this.idLibro = idLibro;
    }
}