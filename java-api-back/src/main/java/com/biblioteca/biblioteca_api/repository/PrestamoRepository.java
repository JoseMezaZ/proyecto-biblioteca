package com.biblioteca.biblioteca_api.repository;

import com.biblioteca.biblioteca_api.model.Libro;
import com.biblioteca.biblioteca_api.model.Prestamo;
import com.biblioteca.biblioteca_api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {

    // Método para encontrar si un libro específico tiene un préstamo activo
    // (es decir, un préstamo donde la fecha de devolución real aún es nula)
    boolean existsByLibroAndFechaDevolucionRealIsNull(Libro libro);

    // Método para encontrar todos los préstamos de un usuario específico
    List<Prestamo> findByUsuario(Usuario usuario);
}