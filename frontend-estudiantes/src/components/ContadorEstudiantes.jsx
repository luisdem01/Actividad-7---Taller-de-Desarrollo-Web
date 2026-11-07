// Contador: recibe los números ya calculados en App
function ContadorEstudiantes({ total, mostrados }) {
  return (
    <div className="contadores">
      <div className="contador">
        <span className="numero">{total}</span>
        <span>Estudiantes registrados</span>
      </div>
      <div className="contador">
        <span className="numero">{mostrados}</span>
        <span>Resultados de la búsqueda</span>
      </div>
    </div>
  );
}

export default ContadorEstudiantes;
