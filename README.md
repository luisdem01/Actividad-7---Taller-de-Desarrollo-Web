# Sistema de Gestión de Estudiantes – UNMSM

Aplicación web para registrar, listar, buscar, editar y eliminar estudiantes.

- **Frontend:** React + Vite (`frontend-estudiantes`, puerto 5173)
- **Backend:** Java + Spring Boot + H2 (`backend-estudiantes`, puerto 8080)

## Requisitos

- JDK 17 o superior (probado con JDK 27)
- Node.js 20 o superior

No hace falta instalar Maven: el proyecto incluye `mvnw.cmd`.

## Cómo ejecutar

**1. Backend** (en una terminal):

```bash
cd backend-estudiantes
.\mvnw.cmd spring-boot:run
```

- API: http://localhost:8080/api/estudiantes
- Consola H2: http://localhost:8080/h2-console (URL `jdbc:h2:mem:universidad`, usuario `sa`, sin contraseña)

**2. Frontend** (en otra terminal):

```bash
cd frontend-estudiantes
npm install
npm run dev
```

Abrir http://localhost:5173

> La base de datos H2 está en memoria: al reiniciar el backend vuelve a los 3 estudiantes de ejemplo.

## Endpoints

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/estudiantes` | 200 + lista |
| GET | `/api/estudiantes/{id}` | 200, o 404 si no existe |
| POST | `/api/estudiantes` | 201 + estudiante creado; 400 datos inválidos; 409 correo repetido |
| PUT | `/api/estudiantes/{id}` | 200; 400; 404; 409 |
| DELETE | `/api/estudiantes/{id}` | 204, o 404 |

Ejemplo de cuerpo para POST o PUT:

```json
{
  "nombre": "Ana Torres",
  "correo": "ana@unmsm.edu.pe",
  "carrera": "Ingeniería de Sistemas"
}
```

## Estructura

```
backend-estudiantes/src/main/java/com/universidad/
├── model/Estudiante.java                 Entidad (tabla de la BD)
├── dto/EstudianteRequestDTO.java         Datos que envía React
├── dto/EstudianteResponseDTO.java        Datos que devuelve la API
├── repository/EstudianteRepository.java  Acceso a la base de datos
├── service/EstudianteService.java        Reglas del negocio
├── controller/EstudianteController.java  Endpoints REST
└── exception/ManejadorErrores.java       Errores en formato { "message": "..." }

frontend-estudiantes/src/
├── services/estudianteService.js         Llamadas fetch a la API
├── reducers/estudiantesReducer.js        CARGAR, AGREGAR, EDITAR, ELIMINAR
├── components/
│   ├── FormularioEstudiante.jsx          Registrar y editar
│   ├── BuscadorEstudiantes.jsx           Filtro por nombre
│   ├── ListaEstudiantes.jsx              Tabla con map()
│   ├── FilaEstudiante.jsx                Un estudiante + botones
│   ├── ContadorEstudiantes.jsx           Cantidad de estudiantes
│   └── Mensaje.jsx                       Carga, error o éxito
├── App.jsx                               Estado principal (Lifting State Up)
└── App.css                               Estilos con la paleta de San Marcos
```

Las respuestas a las preguntas de evaluación están en [RESPUESTAS.md](RESPUESTAS.md).
