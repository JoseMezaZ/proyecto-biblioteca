package com.biblioteca.biblioteca_api.model;

import jakarta.persistence.*; // Importamos de jakarta.persistence
import java.time.LocalDate;

@Entity
@Table(name = "prestamos")
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Relación con Usuario ---
    @ManyToOne(fetch = FetchType.LAZY) // Muchos préstamos pueden pertenecer a Un usuario. LAZY es para eficiencia.
    @JoinColumn(name = "usuario_id", nullable = false) // Nombre de la columna de la clave foránea en la tabla 'prestamos'
    private Usuario usuario;

    // --- Relación con Libro ---
    @ManyToOne(fetch = FetchType.LAZY) // Muchos préstamos pueden ser sobre Un libro (si hay múltiples copias, etc.)
    @JoinColumn(name = "libro_id", nullable = false) // Nombre de la columna de la clave foránea en la tabla 'prestamos'
    private Libro libro;

    @Column(name = "fecha_prestamo", nullable = false)
    private LocalDate fechaPrestamo;

    @Column(name = "fecha_devolucion_estimada", nullable = false)
    private LocalDate fechaDevolucionEstimada;

    @Column(name = "fecha_devolucion_real") // Puede ser nula hasta que se devuelve el libro
    private LocalDate fechaDevolucionReal;

    // Constructor vacío (requerido por JPA)
    public Prestamo() {
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public Libro getLibro() { return libro; }
    public void setLibro(Libro libro) { this.libro = libro; }
    public LocalDate getFechaPrestamo() { return fechaPrestamo; }
    public void setFechaPrestamo(LocalDate fechaPrestamo) { this.fechaPrestamo = fechaPrestamo; }
    public LocalDate getFechaDevolucionEstimada() { return fechaDevolucionEstimada; }
    public void setFechaDevolucionEstimada(LocalDate fechaDevolucionEstimada) { this.fechaDevolucionEstimada = fechaDevolucionEstimada; }
    public LocalDate getFechaDevolucionReal() { return fechaDevolucionReal; }
    public void setFechaDevolucionReal(LocalDate fechaDevolucionReal) { this.fechaDevolucionReal = fechaDevolucionReal; }
}