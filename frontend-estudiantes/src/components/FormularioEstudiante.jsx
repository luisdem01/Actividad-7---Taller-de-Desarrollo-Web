import { useState } from "react";

const CARRERAS = [
  "Ingeniería de Sistemas",
  "Ingeniería de Software",
  "Ciencias de la Computación",
  "Medicina Humana",
  "Derecho",
  "Contabilidad",
];

// Formulario controlado: sirve para registrar y para editar
function FormularioEstudiante({ estudianteEditando, onGuardar, onCancelar, deshabilitado }) {
  // Estado local: los campos del formulario.
  // Si se está editando, empiezan con los datos del estudiante;
  // si no, empiezan vacíos.
  const [nombre, setNombre] = useState(estudianteEditando?.nombre ?? "");
  const [correo, setCorreo] = useState(estudianteEditando?.correo ?? "");
  const [carrera, setCarrera] = useState(estudianteEditando?.carrera ?? "");

  function limpiar() {
    setNombre("");
    setCorreo("");
    setCarrera("");
  }

  async function manejarEnvio(event) {
    event.preventDefault();

    const datos = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      carrera: carrera,
    };

    // onGuardar viene de App y devuelve true si todo salió bien
    const guardado = await onGuardar(datos);
    if (guardado) {
      limpiar();
    }
  }

  return (
    <form className="tarjeta formulario" onSubmit={manejarEnvio}>
      <h3>{estudianteEditando ? "Editar estudiante" : "Registrar estudiante"}</h3>

      <label htmlFor="nombre">Nombre completo</label>
      <input
        id="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ej. Ana Torres"
        required
      />

      <label htmlFor="correo">Correo institucional</label>
      <input
        id="correo"
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="alumno@unmsm.edu.pe"
        required
      />

      <label htmlFor="carrera">Carrera</label>
      <select
        id="carrera"
        value={carrera}
        onChange={(e) => setCarrera(e.target.value)}
        required
      >
        <option value="">Seleccione una carrera</option>
        {CARRERAS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="botones">
        <button type="submit" className="boton-principal" disabled={deshabilitado}>
          {estudianteEditando ? "Guardar cambios" : "Registrar"}
        </button>

        {estudianteEditando && (
          <button type="button" className="boton-secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioEstudiante;
