package com.biblioteca.biblioteca_api.dto;

// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Size;

public class RegisterRequest {
    // @NotBlank
    private String nombre;

    // @NotBlank
    // @Email
    private String correo;

    // @NotBlank
    // @Size(min = 6, max = 20)
    private String contrasena;

    // Constructor vacío, getters y setters necesarios para Jackson
    public RegisterRequest() {}

    public RegisterRequest(String nombre, String correo, String contrasena) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
    }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
}