package com.biblioteca.biblioteca_api.service;

import com.biblioteca.biblioteca_api.dto.PrestamoResponse;
import java.util.List;
import java.util.stream.Collectors;
import com.biblioteca.biblioteca_api.model.Libro;
import com.biblioteca.biblioteca_api.model.Prestamo;
import com.biblioteca.biblioteca_api.model.Usuario;
import com.biblioteca.biblioteca_api.repository.LibroRepository;
import com.biblioteca.biblioteca_api.repository.PrestamoRepository;
import com.biblioteca.biblioteca_api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class PrestamoServiceImple implements PrestamoService {

    @Autowired
    private LibroRepository libroRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PrestamoRepository prestamoRepository;

    @Override
    @Transactional // Anotación para asegurar que todas las operaciones de BD se completen o ninguna (atomicidad)
    public Prestamo crearPrestamo(Long idLibro, String usuarioCorreo) throws Exception {
        // 1. Buscar el usuario por su correo
        Usuario usuario = usuarioRepository.findByCorreo(usuarioCorreo)
                .orElseThrow(() -> new Exception("Usuario no encontrado."));

        // 2. Buscar el libro por su ID
        Libro libro = libroRepository.findById(idLibro)
                .orElseThrow(() -> new Exception("Libro no encontrado."));

        // 3. Verificar si el libro está disponible
        if (!libro.isDisponible()) {
            throw new Exception("El libro no está disponible para préstamo.");
        }

        // 4. Verificar si el libro ya está prestado (doble chequeo)
        if (prestamoRepository.existsByLibroAndFechaDevolucionRealIsNull(libro)) {
            throw new Exception("Error de consistencia: El libro figura como disponible pero ya tiene un préstamo activo.");
        }

        // 5. Si todo está bien, crear el préstamo
        Prestamo nuevoPrestamo = new Prestamo();
        nuevoPrestamo.setLibro(libro);
        nuevoPrestamo.setUsuario(usuario);
        nuevoPrestamo.setFechaPrestamo(LocalDate.now());
        nuevoPrestamo.setFechaDevolucionEstimada(LocalDate.now().plusDays(15)); // Préstamo por 15 días

        // 6. Actualizar el estado del libro a "no disponible"
        libro.setDisponible(false);
        libroRepository.save(libro); // Guarda el estado actualizado del libro

        // 7. Guardar el nuevo registro de préstamo
        return prestamoRepository.save(nuevoPrestamo);
    }

    @Override
    @Transactional(readOnly = true) // readOnly = true es una optimización para consultas que solo leen datos
    public List<PrestamoResponse> obtenerPrestamosPorUsuario(String usuarioCorreo) {
        // Buscamos el usuario por su correo. Si no existe, devolvemos una lista vacía.
        // En una app más compleja, podríamos lanzar una excepción si el usuario no se encuentra.
        return usuarioRepository.findByCorreo(usuarioCorreo)
                .map(usuario -> {
                    // Si el usuario existe, buscamos sus préstamos en el repositorio de préstamos
                    List<Prestamo> prestamos = prestamoRepository.findByUsuario(usuario);
                    // Convertimos cada entidad Prestamo a un DTO PrestamoResponse
                    return prestamos.stream()
                            .map(PrestamoResponse::fromEntity) // Usa el método de fábrica que creamos
                            .collect(Collectors.toList());
                })
                .orElse(List.of()); // Si el usuario no se encuentra, devuelve una lista vacía.
    }

    @Override
    @Transactional // Es una operación de escritura, debe ser transaccional
    public Prestamo devolverLibro(Long idPrestamo, String usuarioCorreo) throws Exception {
        // 1. Buscar el préstamo por su ID
        Prestamo prestamo = prestamoRepository.findById(idPrestamo)
                .orElseThrow(() -> new Exception("Préstamo no encontrado."));

        // 2. Verificar que el usuario que devuelve el libro es el dueño del préstamo
        if (!prestamo.getUsuario().getCorreo().equals(usuarioCorreo)) {
            // Este es un chequeo de seguridad importante
            throw new Exception("Acceso denegado. No tienes permiso para modificar este préstamo.");
        }

        // 3. Verificar que el libro no haya sido devuelto ya
        if (prestamo.getFechaDevolucionReal() != null) {
            throw new Exception("Este libro ya ha sido devuelto.");
        }

        // 4. Si todo está bien, actualizamos los datos
        // Marcamos la fecha de devolución real
        prestamo.setFechaDevolucionReal(LocalDate.now());

        // Obtenemos el libro asociado al préstamo y lo volvemos a poner disponible
        Libro libro = prestamo.getLibro();
        libro.setDisponible(true);
        libroRepository.save(libro); // Guardamos el estado actualizado del libro

        // Guardamos el estado actualizado del préstamo
        return prestamoRepository.save(prestamo);
    }
}