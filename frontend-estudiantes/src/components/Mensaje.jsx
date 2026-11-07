// Mensaje: muestra el estado de la petición HTTP (carga, error o éxito).
// Renderizado condicional: solo se muestra el mensaje que corresponde.
function Mensaje({ cargando, error, exito }) {
  if (cargando) {
    return <p className="mensaje cargando" role="status">Cargando...</p>;
  }

  if (error) {
    return <p className="mensaje error" role="status">⚠ {error}</p>;
  }

  if (exito) {
    return <p className="mensaje exito" role="status">✓ {exito}</p>;
  }

  return null;
}

export default Mensaje;
