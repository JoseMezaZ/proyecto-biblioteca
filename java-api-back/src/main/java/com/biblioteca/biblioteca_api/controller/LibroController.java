package com.biblioteca.biblioteca_api.controller;

import com.biblioteca.biblioteca_api.model.Libro;
import com.biblioteca.biblioteca_api.service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/libros")
public class LibroController {

    private final LibroService libroService;

    @Autowired
    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    @GetMapping
    public List<Libro> obtenerTodosLosLibros() {
        return libroService.obtenerTodosLosLibros();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libro> obtenerLibroPorId(@PathVariable Long id) {
        {
            Optional<Libro> libroOptional = libroService.obtenerLibroPorId(id);
            // Imprime aquí para ver si llega la petición y qué se obtiene del servicio:
            System.out.println("Backend: Buscando libro con ID: " + id);
            if (libroOptional.isPresent()) {
                System.out.println("Backend: Libro encontrado: " + libroOptional.get().getTitulo());
                return ResponseEntity.ok(libroOptional.get());
            } else {
                System.out.println("Backend: Libro NO encontrado con ID: " + id);
                return ResponseEntity.notFound().build();
            }
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Libro>> buscarLibros(@RequestParam("q") String query) {
        List<Libro> librosEncontrados = libroService.buscarLibros(query);
        if (librosEncontrados.isEmpty()) {
            return ResponseEntity.ok(librosEncontrados);
        }
        return ResponseEntity.ok(librosEncontrados);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
    public ResponseEntity<Libro> crearNuevoLibro(@RequestBody Libro libro) {
        Libro nuevoLibro = libroService.crearLibro(libro);
        return new ResponseEntity<>(nuevoLibro, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
    public ResponseEntity<Libro> actualizarLibro(@PathVariable Long id, @RequestBody Libro libroActualizado) {
        return libroService.actualizarLibro(id, libroActualizado)
                .map(libro -> new ResponseEntity<>(libro, HttpStatus.OK)) // 200 OK si se actualizó
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
    public ResponseEntity<Void> eliminarLibro(@PathVariable Long id) {
        libroService.eliminarLibro(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}