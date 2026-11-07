package com.universidad.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

// Convierte los errores en respuestas JSON sencillas: { "message": "..." }
// Así React siempre puede leer el mensaje de la misma forma.
@RestControllerAdvice
public class ManejadorErrores {

    // Errores lanzados en el Service (404 no existe, 409 correo repetido)
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> manejarResponseStatus(ResponseStatusException error) {
        return ResponseEntity
                .status(error.getStatusCode())
                .body(Map.of("message", error.getReason()));
    }

    // Errores de validación del DTO (@NotBlank, @Email) -> 400
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> manejarValidacion(MethodArgumentNotValidException error) {
        String mensaje = error.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", mensaje));
    }
}
