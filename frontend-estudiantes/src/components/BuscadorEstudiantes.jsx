// Buscador: recibe el texto y la función para cambiarlo desde App (props)
function BuscadorEstudiantes({ busqueda, onBuscar }) {
  return (
    <input
      className="buscador"
      type="search"
      value={busqueda}
      onChange={(e) => onBuscar(e.target.value)}
      placeholder="Buscar estudiante por nombre..."
      aria-label="Buscar estudiante por nombre"
    />
  );
}

export default BuscadorEstudiantes;
