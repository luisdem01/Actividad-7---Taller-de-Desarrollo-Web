import { useState, useEffect, useReducer } from "react";
import "./App.css";

import { estudiantesReducer } from "./reducers/estudiantesReducer.js";
import {
  listarEstudiantes,
  registrarEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
} from "./services/estudianteService.js";

import FormularioEstudiante from "./components/FormularioEstudiante.jsx";
import BuscadorEstudiantes from "./components/BuscadorEstudiantes.jsx";
import ListaEstudiantes from "./components/ListaEstudiantes.jsx";
import ContadorEstudiantes from "./components/ContadorEstudiantes.jsx";
import Mensaje from "./components/Mensaje.jsx";

// App es el componente padre: aquí vive el estado (Lifting State Up)
// y se comparte con los hijos mediante props.
function App() {
  // Lista de estudiantes administrada con useReducer
  const [estudiantes, dispatch] = useReducer(estudiantesReducer, []);

  // Estados sencillos con useState
  const [busqueda, setBusqueda] = useState("");
  const [estudianteEditando, setEstudianteEditando] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  // Al iniciar: GET a la API y cargar la lista en el reducer
  useEffect(() => {
    async function cargarEstudiantes() {
      try {
        const datos = await listarEstudiantes();
        dispatch({ type: "CARGAR", estudiantes: datos });
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarEstudiantes();
  }, []);

  // Registrar (POST) o editar (PUT), según si hay un estudiante en edición
  async function guardarEstudiante(datos) {
    setCargando(true);
    setError("");
    setExito("");

    try {
      if (estudianteEditando) {
        const actualizado = await actualizarEstudiante(estudianteEditando.id, datos);
        dispatch({ type: "EDITAR", estudiante: actualizado });
        setExito(`Se actualizaron los datos de ${actualizado.nombre}.`);
        setEstudianteEditando(null);
      } else {
        const nuevo = await registrarEstudiante(datos);
        dispatch({ type: "AGREGAR", estudiante: nuevo });
        setExito(`Estudiante registrado con código ${nuevo.id}.`);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setCargando(false);
    }
  }

  // Eliminar (DELETE) previa confirmación
  async function borrarEstudiante(estudiante) {
    const confirmado = window.confirm(`¿Eliminar a ${estudiante.nombre}?`);
    if (!confirmado) return;

    setCargando(true);
    setError("");
    setExito("");

    try {
      await eliminarEstudiante(estudiante.id);
      dispatch({ type: "ELIMINAR", id: estudiante.id });
      setExito(`Se eliminó a ${estudiante.nombre}.`);

      // Si se estaba editando ese mismo estudiante, se cancela la edición
      if (estudianteEditando?.id === estudiante.id) {
        setEstudianteEditando(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  function seleccionarParaEditar(estudiante) {
    setEstudianteEditando(estudiante);
    setError("");
    setExito("");
  }

  // Datos calculados (estado derivado): no se guardan en ningún estado
  const estudiantesFiltrados = estudiantes.filter((e) =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <header className="barra">
        <div className="contenedor barra-contenido">
          <span className="logo">UNMSM</span>
          <span className="barra-texto">Sistema Académico</span>
        </div>
      </header>

      <section className="hero">
        <h1>Universidad Nacional Mayor de San Marcos</h1>
        <p>Universidad del Perú, Decana de América</p>
        <span className="insignia">Sistema de Gestión de Estudiantes</span>
      </section>

      <main className="contenedor">
        <ContadorEstudiantes
          total={estudiantes.length}
          mostrados={estudiantesFiltrados.length}
        />

        <Mensaje cargando={cargando} error={error} exito={exito} />

        <div className="columnas">
          <section>
            <h2 className="titulo-seccion">
              {estudianteEditando ? "Edición" : "Registro"}
            </h2>
            {/* La key cambia al elegir otro estudiante: React crea el formulario
                de nuevo y así se precargan sus datos */}
            <FormularioEstudiante
              key={estudianteEditando?.id ?? "nuevo"}
              estudianteEditando={estudianteEditando}
              onGuardar={guardarEstudiante}
              onCancelar={() => setEstudianteEditando(null)}
              deshabilitado={cargando}
            />
          </section>

          <section>
            <h2 className="titulo-seccion">Estudiantes registrados</h2>
            <BuscadorEstudiantes busqueda={busqueda} onBuscar={setBusqueda} />
            <ListaEstudiantes
              estudiantes={estudiantesFiltrados}
              onEditar={seleccionarParaEditar}
              onEliminar={borrarEstudiante}
              deshabilitado={cargando}
            />
          </section>
        </div>
      </main>

      <footer className="pie">
        Universidad Nacional Mayor de San Marcos · Taller Web · Actividad 7
      </footer>
    </>
  );
}

export default App;
