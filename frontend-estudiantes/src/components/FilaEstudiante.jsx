// Fila: muestra un estudiante y sus botones Editar / Eliminar
function FilaEstudiante({ estudiante, onEditar, onEliminar, deshabilitado }) {
  return (
    <tr>
      <td>{estudiante.id}</td>
      <td>{estudiante.nombre}</td>
      <td>{estudiante.correo}</td>
      <td>{estudiante.carrera}</td>
      <td className="acciones">
        <button
          className="boton-editar"
          onClick={() => onEditar(estudiante)}
          disabled={deshabilitado}
        >
          Editar
        </button>
        <button
          className="boton-eliminar"
          onClick={() => onEliminar(estudiante)}
          disabled={deshabilitado}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default FilaEstudiante;
