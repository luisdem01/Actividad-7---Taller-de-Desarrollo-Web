package com.universidad.controller;

import com.universidad.dto.EstudianteRequestDTO;
import com.universidad.dto.EstudianteResponseDTO;
import com.universidad.service.EstudianteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controller: recibe las solicitudes HTTP y delega el trabajo al Service
@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = "http://localhost:5173") // permite las peticiones del frontend React
public class EstudianteController {

    private final EstudianteService estudianteService;

    public EstudianteController(EstudianteService estudianteService) {
        this.estudianteService = estudianteService;
    }

    // GET /api/estudiantes -> 200 + lista
    @GetMapping
    public List<EstudianteResponseDTO> listar() {
        return estudianteService.listar();
    }

    // GET /api/estudiantes/{id} -> 200, o 404 si no existe
    @GetMapping("/{id}")
    public EstudianteResponseDTO buscar(@PathVariable Long id) {
        return estudianteService.buscar(id);
    }

    // POST /api/estudiantes -> 201 + estudiante creado
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EstudianteResponseDTO registrar(@Valid @RequestBody EstudianteRequestDTO datos) {
        return estudianteService.registrar(datos);
    }

    // PUT /api/estudiantes/{id} -> 200, o 404 si no existe
    @PutMapping("/{id}")
    public EstudianteResponseDTO actualizar(@PathVariable Long id,
                                            @Valid @RequestBody EstudianteRequestDTO datos) {
        return estudianteService.actualizar(id, datos);
    }

    // DELETE /api/estudiantes/{id} -> 204, o 404 si no existe
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        estudianteService.eliminar(id);
    }
}
