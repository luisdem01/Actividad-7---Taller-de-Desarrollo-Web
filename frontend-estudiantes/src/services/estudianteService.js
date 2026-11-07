// Servicio: centraliza todas las llamadas al backend Spring Boot
const API_URL = "http://localhost:8080/api/estudiantes";

// Función auxiliar: hace la petición y revisa si hubo error
async function enviarPeticion(url, opciones) {
  let respuesta;

  try {
    respuesta = await fetch(url, opciones);
  } catch {
    // fetch falla así cuando el servidor está apagado o no hay conexión
    throw new Error("No se pudo conectar con el servidor. Verifique que el backend esté encendido.");
  }

  // fetch NO lanza error con 404 o 500, por eso revisamos respuesta.ok
  if (!respuesta.ok) {
    const datos = await respuesta.json().catch(() => null);
    throw new Error(datos?.message ?? `Error HTTP: ${respuesta.status}`);
  }

  // DELETE responde 204 (sin contenido), no hay JSON que leer
  if (respuesta.status === 204) {
    return null;
  }

  return respuesta.json();
}

// GET: consultar estudiantes
export function listarEstudiantes() {
  return enviarPeticion(API_URL);
}

// POST: registrar estudiante
export function registrarEstudiante(estudiante) {
  return enviarPeticion(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(estudiante),
  });
}

// PUT: actualizar estudiante
export function actualizarEstudiante(id, estudiante) {
  return enviarPeticion(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(estudiante),
  });
}

// DELETE: eliminar estudiante
export function eliminarEstudiante(id) {
  return enviarPeticion(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
