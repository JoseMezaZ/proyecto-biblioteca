# Proyecto Biblioteca Virtual (Full Stack)

Este es un proyecto completo de una aplicación web para una biblioteca virtual, desarrollado con un backend en Java (Spring Boot), un frontend en React, y un generador de estadísticas en Python.

## Arquitectura del Proyecto

El proyecto está organizado en un monorepo con tres componentes principales:
* `/java-api-back`: La API REST del backend construida con Spring Boot y conectada a una base de datos MySQL.
* `/biblioteca-frontend`: La aplicación de una sola página (SPA) del frontend construida con React (Vite).
* `/generador-dashboard`: Un script en Python para generar gráficos y análisis de datos para el dashboard de administración.

## Prerrequisitos

Para ejecutar este proyecto, necesitarás tener instalado:
* Java JDK (versión 21 o superior)
* Apache Maven
* Node.js y npm
* Python 3 y pip
* Un servidor de base de datos MySQL (se usó XAMPP para el desarrollo)
* Git

## Guía de Instalación y Ejecución

1. **Clonar el Repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
   cd tu-repositorio
   ```

2. **Configurar el Backend (Java):**
   * Abre el proyecto `java-api-back` en tu IDE preferido (IntelliJ/Eclipse).
   * Asegúrate de que tu servidor MySQL (XAMPP) esté corriendo.
   * Crea una base de datos llamada `biblioteca_db` en MySQL.
   * Configura tus credenciales de la base de datos en el archivo `src/main/resources/application.properties`.
   * El IDE debería descargar las dependencias de Maven automáticamente.

3. **Configurar el Frontend (React):**
   * Navega a la carpeta del frontend: `cd biblioteca-frontend`
   * Instala las dependencias de Node.js:
     ```bash
     npm install
     ```

4. **Configurar el Script de Python:**
   * Navega a la carpeta del script: `cd generador-dashboard` (desde la raíz)
   * Instala las dependencias de Python:
     ```bash
     pip install pandas matplotlib numpy faker
     ```

## Cómo Ejecutar la Aplicación

Debes tener 3 terminales abiertas o ejecutar los procesos en segundo plano.

1. **Iniciar el Backend:** En tu IDE, ejecuta la clase principal `BibliotecaApiApplication.java`. El servidor se iniciará en `http://localhost:8080`.
2. **Iniciar el Frontend:** En una terminal, dentro de la carpeta `biblioteca-frontend`, ejecuta:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`.
3. **Generar los Gráficos (Opcional):** Para ver el dashboard de admin, primero debes generar los gráficos. En otra terminal, dentro de la carpeta `generador-dashboard`, ejecuta:
   ```bash
   python generar_estadisticas.py
   ```