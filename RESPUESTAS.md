# Actividad práctica – Integración Frontend y Backend

**Título:** Implementación del manejo de estado en un sistema de gestión de estudiantes
**Universidad Nacional Mayor de San Marcos – Taller Web – Actividad 7**

## Preguntas de evaluación

### 1. ¿Qué es el estado en una aplicación frontend y cuál es su importancia?

El estado (*state*) es el conjunto de datos que una aplicación mantiene durante su ejecución y que puede cambiar mientras el usuario interactúa con ella. Cuando el estado cambia, React vuelve a renderizar los componentes que dependen de él, y la interfaz se actualiza sin recargar la página.

Es importante porque permite:

- actualizar dinámicamente la interfaz;
- controlar formularios;
- responder a las acciones del usuario;
- compartir información entre componentes;
- gestionar los procesos asíncronos: carga, éxito y error;
- mantener la información consistente en toda la aplicación.

**En nuestro proyecto**, el estado guarda:

- la lista de estudiantes;
- el texto del buscador;
- el estudiante que se está editando;
- los campos del formulario;
- los indicadores `cargando`, `error` y `exito`.

### 2. ¿Qué diferencias existen entre props y state en React?

| Props | State |
|---|---|
| Datos que un componente **recibe** de su componente padre. | Datos que un componente **administra** por sí mismo. |
| Son de solo lectura: el componente que las recibe no debe modificarlas. | Se modifican con su función de actualización (por ejemplo, `setBusqueda`). |
| Sirven para configurar y reutilizar componentes. | Sirve para representar cambios e interacciones. |
| Fluyen de padre a hijo. | Pertenecen al componente donde se declaran. |

**En nuestro proyecto:**

- `estudiantes` es **estado** en `App`.
- Cuando `App` se lo pasa a `ListaEstudiantes`, ese mismo dato llega al hijo como **prop**. El hijo lo muestra, pero no lo modifica.
- Para eliminar, el hijo llama a la función `onEliminar`, que también recibió por props.

### 3. ¿Para qué se utiliza el Hook useState?

`useState` permite declarar y actualizar estados dentro de componentes funcionales. Su sintaxis es:

```js
const [estado, setEstado] = useState(valorInicial);
```

- `estado` contiene el valor actual.
- `setEstado` lo actualiza y provoca un nuevo renderizado.
- `valorInicial` es el valor con el que comienza.

No basta con modificar una variable normal: hay que usar la función de actualización para que React vuelva a renderizar el componente.

**En nuestro proyecto** se usa para:

- el texto de búsqueda;
- el estudiante en edición;
- los estados `cargando`, `error` y `exito`;
- los campos `nombre`, `correo` y `carrera` del formulario (componente controlado).

### 4. ¿Qué significa elevar el estado (Lifting State Up)?

Elevar el estado significa colocarlo en el componente padre común de los componentes que lo necesitan, y compartirlo con ellos mediante props. Así existe **una única fuente de verdad** y se evita que cada componente tenga una copia distinta e inconsistente de los datos.

**En nuestro proyecto**, la lista de estudiantes vive en `App`, y desde ahí se comparte con:

- `ListaEstudiantes`, que la muestra;
- `ContadorEstudiantes`, que muestra la cantidad;
- `FormularioEstudiante`, que la modifica a través de la función `onGuardar`.

Cuando se registra un estudiante, la lista y el contador se actualizan a la vez, porque leen el mismo estado.

### 5. ¿Cuál es la diferencia entre Context API y Redux Toolkit?

| Context API | Redux Toolkit |
|---|---|
| Viene incluida en React (`createContext`, `Provider`, `useContext`). | Es una biblioteca externa que hay que instalar. |
| Su objetivo principal es **compartir** datos sin pasar props por muchos niveles (evita el *prop drilling*). | Su objetivo es **administrar** un estado global centralizado, con reglas claras de actualización. |
| Es adecuada para datos que cambian poco: usuario autenticado, tema, idioma. | Es adecuada para aplicaciones grandes con muchas operaciones y estados complejos. |
| No impone una estructura: cada uno decide cómo actualizar los datos. | Organiza el estado en *slices*, acciones y reducers, e incluye herramientas de depuración. |

Context API facilita compartir datos, pero no reemplaza automáticamente a una solución completa de administración de estado como Redux Toolkit.

### 6. ¿En qué situaciones resulta conveniente utilizar useReducer?

`useReducer` conviene cuando:

- el estado tiene **varias operaciones** que lo modifican;
- las reglas de actualización son más complejas que un simple `set`;
- se quiere reunir toda la lógica de cambio en un solo lugar.

Se basa en tres elementos:

- **State:** el estado actual.
- **Action:** lo que se desea hacer, por ejemplo `{ type: "AGREGAR" }`.
- **Reducer:** la función que decide cómo cambia el estado.

**En nuestro proyecto**, la lista de estudiantes tiene cuatro operaciones: `CARGAR`, `AGREGAR`, `EDITAR` y `ELIMINAR`. Por eso se administra con `useReducer`, en `estudiantesReducer.js`. Los componentes solo envían acciones con `dispatch`, y el reducer siempre devuelve un **arreglo nuevo**, usando `...`, `map()` y `filter()`, sin modificar el anterior. Para estados simples, como el texto del buscador, sigue siendo más práctico `useState`.

### 7. ¿Qué diferencia existe entre el estado de cliente y el estado de servidor?

| Estado de cliente | Estado de servidor |
|---|---|
| Información que pertenece a la interfaz y solo existe en el navegador. | Información que proviene del backend y se guarda en la base de datos. |
| El frontend la controla por completo. | El frontend solo tiene una copia; la fuente de verdad es el servidor. |
| Ejemplos: texto del buscador, formulario, estudiante en edición. | Ejemplos: la lista de estudiantes registrados. |
| Se maneja con `useState` y `useReducer`. | Requiere peticiones HTTP y control de carga, error y sincronización (por ejemplo, con TanStack Query). |

**En nuestro proyecto**, cada operación llama **primero a la API** y, solo si el servidor responde correctamente, actualiza el estado local con `dispatch`. Así la copia del frontend siempre coincide con lo que guardó el backend.

## Cómo cumple el proyecto cada actividad

| Actividad | Implementación |
|---|---|
| 1. useState | `App.jsx`: búsqueda, edición, carga, error y éxito |
| 2. Formularios controlados | `FormularioEstudiante.jsx`: `value` + `onChange` |
| 3. Props | `App` comparte datos y funciones con todos los componentes hijos |
| 4. Buscador dinámico | `BuscadorEstudiantes.jsx` + `filter()` en `App` |
| 5. useReducer | `estudiantesReducer.js`: CARGAR, AGREGAR, EDITAR y ELIMINAR |
| 6. API REST Spring Boot | `backend-estudiantes` + `estudianteService.js` |
| 7. Carga, error y éxito | `Mensaje.jsx` + `try/catch/finally` en `App` |
