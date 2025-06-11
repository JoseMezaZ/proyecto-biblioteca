package com.biblioteca.biblioteca_api.dto;

public record LoginResponse(
        String token,
        String correo, // Opcional: enviar de vuelta el correo/nombre del usuario
        String nombre,  // Opcional
        String rol      // Opcional: enviar el rol
) {}

// Clase tradicional equivalente:
/*
public class LoginResponse {
    private String token;
    private String correo;
    private String nombre;
    private String rol;

    public LoginResponse(String token, String correo, String nombre, String rol) {
        this.token = token;
        this.correo = correo;
        this.nombre = nombre;
        this.rol = rol;
    }
    // Getters
    public String getToken() { return token; }
    public String getCorreo() { return correo; }
    public String getNombre() { return nombre; }
    public String getRol() { return rol; }
}
*/
