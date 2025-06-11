package com.biblioteca.biblioteca_api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "libros")
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String titulo;

    @Column(nullable = false, length = 150)
    private String autor;

    @Column(length = 20, unique = true)
    private String isbn;

    @Column(length = 500)
    private String portada;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private boolean disponible;
    private boolean novedad;
    private boolean destacado;

    @JsonProperty("cantidad_busquedas")
    @Column(name = "cantidad_busquedas")
    private int cantidadBusquedas;

    // Constructor vacío (requerido por JPA) y Getters/Setters ...
    public Libro() {}
    // ... (asegúrate de que todos los getters y setters estén aquí, incluyendo para Long id)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    // ... resto de getters y setters ...
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getAutor() { return autor; }
    public void setAutor(String autor) { this.autor = autor; }
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public String getPortada() { return portada; }
    public void setPortada(String portada) { this.portada = portada; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public boolean isDisponible() { return disponible; }
    public void setDisponible(boolean disponible) { this.disponible = disponible; }
    public boolean isNovedad() { return novedad; }
    public void setNovedad(boolean novedad) { this.novedad = novedad; }
    public boolean isDestacado() { return destacado; }
    public void setDestacado(boolean destacado) { this.destacado = destacado; }
    public int getCantidadBusquedas() { return cantidadBusquedas; }
    public void setCantidadBusquedas(int cantidadBusquedas) { this.cantidadBusquedas = cantidadBusquedas; }
}