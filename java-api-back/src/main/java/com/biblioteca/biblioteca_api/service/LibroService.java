package com.biblioteca.biblioteca_api.service;

import com.biblioteca.biblioteca_api.model.Libro;
import java.util.List;
import java.util.Optional;

public interface LibroService {
    List<Libro> obtenerTodosLosLibros();
    Optional<Libro> obtenerLibroPorId(Long id);
    List<Libro> buscarLibros(String query); // <--- NUEVO MÉTODO
    Libro crearLibro(Libro libro);
    Optional<Libro> actualizarLibro(Long id, Libro libroActualizado);
    void eliminarLibro(Long id);
}