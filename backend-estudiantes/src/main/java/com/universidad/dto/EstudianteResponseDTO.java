package com.universidad.dto;

// Response DTO: datos que el backend devuelve a React (incluye el id generado)
public record EstudianteResponseDTO(
        Long id,
        String nombre,
        String correo,
        String carrera
) {
}
