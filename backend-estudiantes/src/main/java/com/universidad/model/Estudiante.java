package com.universidad.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// Entidad: representa la tabla "estudiante" en la base de datos
@Entity
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // la BD genera el id
    private Long id;

    private String nombre;

    @Column(unique = true)
    private String correo;

    private String carrera;

    // JPA necesita un constructor vacío
    public Estudiante() {
    }

    public Estudiante(String nombre, String correo, String carrera) {
        this.nombre = nombre;
        this.correo = correo;
        this.carrera = carrera;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getCarrera() {
        return carrera;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }
}
