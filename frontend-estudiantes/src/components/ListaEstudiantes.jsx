import FilaEstudiante from "./FilaEstudiante.jsx";

// Lista: recorre los estudiantes con map() y crea una fila por cada uno
function ListaEstudiantes({ estudiantes, onEditar, onEliminar, deshabilitado }) {
  if (estudiantes.length === 0) {
    return <p className="vacio">No hay estudiantes para mostrar.</p>;
  }

  return (
    <div className="tabla-contenedor">
      <table className="tabla">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <FilaEstudiante
              key={estudiante.id}
              estudiante={estudiante}
              onEditar={onEditar}
              onEliminar={onEliminar}
              deshabilitado={deshabilitado}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaEstudiantes;
