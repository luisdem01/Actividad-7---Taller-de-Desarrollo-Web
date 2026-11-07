package com.universidad.service;

import com.universidad.dto.EstudianteRequestDTO;
import com.universidad.dto.EstudianteResponseDTO;
import com.universidad.model.Estudiante;
import com.universidad.repository.EstudianteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

// Service: contiene las reglas del negocio
@Service
public class EstudianteService {

    private final EstudianteRepository estudianteRepository;

    public EstudianteService(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    public List<EstudianteResponseDTO> listar() {
        return estudianteRepository.findAll()
                .stream()
                .map(this::convertirAResponse)
                .toList();
    }

    public EstudianteResponseDTO buscar(Long id) {
        Estudiante estudiante = obtenerPorId(id);
        return convertirAResponse(estudiante);
    }

    public EstudianteResponseDTO registrar(EstudianteRequestDTO datos) {
        // Regla: el correo no puede repetirse
        if (estudianteRepository.existsByCorreo(datos.correo())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El correo ya está registrado");
        }

        Estudiante nuevo = new Estudiante(datos.nombre(), datos.correo(), datos.carrera());
        Estudiante guardado = estudianteRepository.save(nuevo);
        return convertirAResponse(guardado);
    }

    public EstudianteResponseDTO actualizar(Long id, EstudianteRequestDTO datos) {
        Estudiante estudiante = obtenerPorId(id);

        // Regla: el correo no puede pertenecer a otro estudiante
        if (estudianteRepository.existsByCorreoAndIdNot(datos.correo(), id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El correo ya está registrado");
        }

        estudiante.setNombre(datos.nombre());
        estudiante.setCorreo(datos.correo());
        estudiante.setCarrera(datos.carrera());

        Estudiante guardado = estudianteRepository.save(estudiante);
        return convertirAResponse(guardado);
    }

    public void eliminar(Long id) {
        Estudiante estudiante = obtenerPorId(id);
        estudianteRepository.delete(estudiante);
    }

    // Busca un estudiante o lanza 404 si no existe
    private Estudiante obtenerPorId(Long id) {
        return estudianteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No existe el estudiante con id " + id));
    }

    // Convierte la entidad en el DTO que se envía al frontend
    private EstudianteResponseDTO convertirAResponse(Estudiante estudiante) {
        return new EstudianteResponseDTO(
                estudiante.getId(),
                estudiante.getNombre(),
                estudiante.getCorreo(),
                estudiante.getCarrera()
        );
    }
}
