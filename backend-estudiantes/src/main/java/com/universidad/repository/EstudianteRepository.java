package com.universidad.repository;

import com.universidad.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository: acceso a la base de datos.
// JpaRepository ya incluye save(), findAll(), findById(), deleteById(), etc.
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {

    // Spring genera la consulta a partir del nombre del método:
    // ¿existe algún estudiante con este correo?
    boolean existsByCorreo(String correo);

    // ¿existe otro estudiante (con distinto id) que use este correo?
    boolean existsByCorreoAndIdNot(String correo, Long id);
}
