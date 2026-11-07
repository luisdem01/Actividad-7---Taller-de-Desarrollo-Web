// Reducer: define cómo cambia la lista de estudiantes según cada acción.
// Siempre devuelve un arreglo NUEVO (no modifica el anterior).
export function estudiantesReducer(state, action) {
  switch (action.type) {
    case "CARGAR":
      return action.estudiantes;

    case "AGREGAR":
      return [...state, action.estudiante];

    case "EDITAR":
      return state.map((e) =>
        e.id === action.estudiante.id ? action.estudiante : e
      );

    case "ELIMINAR":
      return state.filter((e) => e.id !== action.id);

    default:
      return state;
  }
}
