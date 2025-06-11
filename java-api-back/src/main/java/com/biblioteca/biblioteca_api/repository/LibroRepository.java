package com.biblioteca.biblioteca_api.repository;

import com.biblioteca.biblioteca_api.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LibroRepository extends JpaRepository<Libro, Long> {
    // La búsqueda ahora con dos parámetros para que Spring Data JPA la implemente
    List<Libro> findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(String titulo, String autor);
}