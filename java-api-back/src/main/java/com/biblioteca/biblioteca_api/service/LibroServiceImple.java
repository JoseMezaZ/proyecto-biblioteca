package com.biblioteca.biblioteca_api.service;

import com.biblioteca.biblioteca_api.model.Libro;
import com.biblioteca.biblioteca_api.repository.LibroRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class LibroServiceImple implements LibroService {

    private final LibroRepository libroRepository; // Ahora Spring inyectará la implementación JPA

    @Autowired
    public LibroServiceImple(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    @Override
    public List<Libro> obtenerTodosLosLibros() {
        return libroRepository.findAll();
    }

    @Override
    public Optional<Libro> obtenerLibroPorId(Long id) { // <-- Recibe Long
        if (id == null) {
            return Optional.empty();
        }
        return libroRepository.findById(id); // Llama directamente con Long
    }

    @Override
    public List<Libro> buscarLibros(String query) {
        if (query == null || query.trim().isEmpty()) {
            return Collections.emptyList();
        }
        // Llama al nuevo método de búsqueda del repositorio JPA, pasando la query dos veces
        return libroRepository.findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(query, query);
    }

    @Override
    @Transactional // Un método que escribe en la BD debe ser transaccional
    public Libro crearLibro(Libro libro) {
        // El ID será generado automáticamente por la BD, así que nos aseguramos que venga como null.
        libro.setId(null);
        return libroRepository.save(libro);
    }

    @Override
    @Transactional
    public Optional<Libro> actualizarLibro(Long id, Libro libroActualizado) {
        // Buscamos el libro por ID. Si existe, lo actualizamos.
        return libroRepository.findById(id)
                .map(libroExistente -> {
                    libroExistente.setTitulo(libroActualizado.getTitulo());
                    libroExistente.setAutor(libroActualizado.getAutor());
                    libroExistente.setIsbn(libroActualizado.getIsbn());
                    libroExistente.setPortada(libroActualizado.getPortada());
                    libroExistente.setDescripcion(libroActualizado.getDescripcion());
                    libroExistente.setDisponible(libroActualizado.isDisponible());
                    libroExistente.setNovedad(libroActualizado.isNovedad());
                    libroExistente.setDestacado(libroActualizado.isDestacado());
                    libroExistente.setCantidadBusquedas(libroActualizado.getCantidadBusquedas());
                    return libroRepository.save(libroExistente);
                }); // .map devuelve un Optional con el libro actualizado, o un Optional vacío si no se encontró el libro original.
    }

    @Override
    @Transactional
    public void eliminarLibro(Long id) {
        // findById para asegurar que existe antes de intentar borrar
        if (libroRepository.existsById(id)) {
            libroRepository.deleteById(id);
        }
        // Podríamos lanzar una excepción si no existe, para notificar al controlador.
        // Por ahora, si no existe, simplemente no hace nada.
    }


}