# Z41F3R HACKLAB

Base de conocimiento personal enfocada en **ciberseguridad, programación, investigación y experimentación práctica**.

HACKLAB funciona como una interfaz web para organizar y consultar notas escritas en Markdown, manteniendo el contenido separado de la interfaz.

🌐 **Web:** https://z41f3r.github.io/HACKLAB/
📦 **Repositorio:** https://github.com/Z41F3R/HACKLAB

---

### ¿Qué es HACKLAB?

HACKLAB es una aplicación web estática construida para almacenar y consultar conocimiento técnico mediante archivos Markdown.

La idea principal es mantener una separación sencilla:

```text
Markdown
   ↓
content/
   ↓
Aplicación React
   ↓
Parser Markdown
   ↓
Syntax Highlighting
   ↓
Interfaz HACKLAB
```

El contenido vive en archivos `.md`, mientras que React se encarga de convertirlos en una interfaz navegable.

Esto permite agregar nuevas notas sin tener que modificar los componentes de la aplicación.

---

# Tecnologías

### Frontend

* React
* TypeScript
* Vite
* HTML
* CSS

### Procesamiento de Markdown

* `marked`

Utilizado para convertir los archivos Markdown en HTML.

### Syntax Highlighting

* `highlight.js`

Utilizado exclusivamente para aplicar colores a bloques de código según el lenguaje utilizado.

Ejemplo:

````markdown
```python
print("Hello World")
```
````

o:

````markdown
```bash
nmap -sV 10.10.10.10
```
````

El contenido original del Markdown no se modifica.

### Deployment

* GitHub Pages
* GitHub Actions

Cada cambio enviado a `main` ejecuta automáticamente el proceso de build y despliegue.

---

# Estructura del proyecto

```text
HACKLAB/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── content/
│   ├── Python_Ofensivo/
│   │   ├── 1. Introducción a Python.md
│   │   │
│   │   ├── 2. Conceptos básicos de Python/
│   │   │   ├── 1. Interprete de Python.md
│   │   │   ├── 2. Shebang y convenios en Python.md
│   │   │   ├── 3. Variables y tipos de datos.md
│   │   │   ├── 4. Operadores básicos en Python.md
│   │   │   ├── 5. String Formatting.md
│   │   │   └── 6. Control de flujo (Condicionales y Bucles).md
│   │   │
│   │   └── Librerias/
│   │       └── 1.Pathlib.md
│   │
│   └── Web/
│       ├── sqli.md
│       └── xss.md
│
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Home.tsx
│   │   ├── MarkdownViewer.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── App.tsx
│   ├── content.ts
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

> La estructura puede crecer a medida que se incorporen nuevas áreas de conocimiento.

---

# ¿Dónde está cada cosa?

### `content/`

Es la parte más importante para el contenido.

Aquí viven todas las notas del HACKLAB.

No es necesario modificar React para agregar una nueva nota.

Por ejemplo:

```text
content/
└── Web/
    └── xss.md
```

Se puede crear:

```text
content/
└── Web/
    ├── xss.md
    └── csrf.md
```

La nueva nota será detectada automáticamente por la aplicación.

También se pueden crear subdirectorios:

```text
content/
└── Web/
    └── Vulnerabilidades/
        ├── xss.md
        ├── sqli.md
        └── csrf.md
```

La aplicación soporta múltiples niveles de carpetas.

---

# `src/content.ts`

Este archivo es el encargado de descubrir los archivos Markdown dentro de `content/`.

Utiliza `import.meta.glob` de Vite para cargar automáticamente los `.md`.

También construye información utilizada por la interfaz:

* nombre de la nota
* ruta
* carpeta
* estructura de carpetas
* contenido Markdown

No es necesario registrar manualmente cada nota.

---

# `src/App.tsx`

Es el componente principal de la aplicación.

Se encarga de coordinar:

* navegación
* selección de notas
* búsqueda
* sidebar
* Home
* rutas mediante `hash`
* archivo Markdown actualmente seleccionado

También controla qué contenido debe mostrarse.

La navegación utiliza rutas como:

```text
#/Python_Ofensivo/1.%20Introducción%20a%20Python
```

Esto permite acceder directamente a una nota mediante su URL.

---

# `src/components/`

Contiene los componentes principales de la interfaz.

### `Header.tsx`

Contiene:

* nombre de HACKLAB
* buscador de escritorio
* botón del menú móvil

El Header permanece estático mientras el contenido hace scroll.

---

### `Sidebar.tsx`

Contiene el explorador de archivos.

Se encarga de mostrar:

* carpetas
* subcarpetas
* notas
* nota actualmente seleccionada
* navegación en escritorio
* menú lateral en dispositivos móviles

---

### `MarkdownViewer.tsx`

Es el componente encargado de mostrar una nota Markdown.

El proceso es:

```text
Archivo .md
    ↓
marked
    ↓
HTML
    ↓
highlight.js
    ↓
Bloques de código coloreados
```

`highlight.js` solamente aplica syntax highlighting.

No modifica la estructura ni el contenido original del bloque de código.

---

### `Home.tsx`

Contiene la página principal de HACKLAB.

Actualmente incluye:

* presentación del proyecto
* enlace al repositorio
* cantidad de notas
* cantidad de carpetas
* cantidad de áreas
* recomendaciones aleatorias

Las recomendaciones se generan automáticamente a partir de las notas disponibles.

Cada cierto tiempo se actualizan sin necesidad de mantener una lista manual.

---

### `src/index.css`

Contiene todo el estilo visual de HACKLAB.

Incluye:

* tema oscuro
* colores verdes
* tipografía
* sidebar
* Header
* buscador
* Markdown
* bloques de código
* tablas
* enlaces
* responsive design
* Home
* comportamiento móvil

La interfaz utiliza una estética inspirada en entornos Linux/terminal, manteniendo una apariencia limpia y funcional.

---

# Markdown

Las notas se escriben utilizando Markdown estándar.

Ejemplo:

````markdown
# SQL Injection

## Descripción

SQL Injection es una vulnerabilidad...

## Ejemplo

```sql
SELECT username, password
FROM users;
````

`````

No es necesario utilizar componentes React para escribir contenido.

---

# Lenguajes soportados

`highlight.js` permite detectar y colorear múltiples lenguajes.

Algunos ejemplos:

- Python
- Bash
- Shell
- JavaScript
- TypeScript
- SQL
- HTML
- CSS
- JSON
- XML
- PHP
- Java
- C
- C++
- Go
- Rust
- PowerShell

El lenguaje se indica directamente en el bloque Markdown:

````markdown
```python
print("Hello")
`````

`````

````markdown
```bash
whoami
```
`````

````markdown
```sql
SELECT * FROM users;
```
````

Si un bloque no especifica lenguaje, continúa funcionando como un bloque de código normal.

---

# Búsqueda

El buscador trabaja directamente sobre las notas cargadas.

Puede encontrar coincidencias en:

* nombre de la nota
* carpetas
* contenido Markdown

Por ejemplo, buscar:

```text
python
```

puede encontrar notas donde:

* el nombre contiene `python`
* una carpeta contiene `python`
* el contenido contiene `python`

---

# Navegación

HACKLAB utiliza navegación mediante `hash`.

Ejemplo:

```text
#/Web/xss
```

Esto evita la necesidad de un backend o configuración especial de rutas en GitHub Pages.

La URL puede compartirse directamente y permite acceder a una nota específica.

---

# Responsive Design

La interfaz está diseñada para escritorio y dispositivos móviles.

### Desktop

```text
┌─────────────────────────────────────────────┐
│ HEADER                                      │
├──────────────┬──────────────────────────────┤
│              │                              │
│   SIDEBAR    │          CONTENT             │
│              │                              │
│              │          ↓ scroll            │
│              │                              │
└──────────────┴──────────────────────────────┘
```

El Header y Sidebar permanecen estáticos.

El contenido principal tiene su propio scroll.

### Mobile

```text
┌──────────────────────┐
│ HEADER               │
├──────────────────────┤
│                      │
│ CONTENT              │
│                      │
│       ↓ scroll       │
│                      │
└──────────────────────┘
```

El sidebar aparece como menú lateral superpuesto.

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Z41F3R/HACKLAB.git
```

Entrar al proyecto:

```bash
cd HACKLAB
```

Instalar dependencias:

```bash
npm install
```

---

# Desarrollo local

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará una dirección similar a:

```text
http://localhost:5173/
```

---

# Build

Para generar una versión de producción:

```bash
npm run build
```

El resultado se genera en:

```text
dist/
```

Para validar el proyecto antes de subir cambios:

```bash
npm run build
```

Si el build termina correctamente, el proyecto está listo para ser desplegado.

---

# Dependencias principales

Las dependencias utilizadas directamente por HACKLAB incluyen:

```text
react
react-dom
marked
highlight.js
```

Las dependencias de desarrollo incluyen las necesarias para:

```text
Vite
TypeScript
React
```

`package.json` contiene la lista exacta de versiones utilizadas por el proyecto.

`package-lock.json` mantiene bloqueadas las versiones instaladas para reproducir el mismo entorno.

---

# Deployment

El proyecto utiliza GitHub Actions para realizar el despliegue automáticamente.

Workflow:

```text
git push
   ↓
GitHub Actions
   ↓
npm ci
   ↓
npm run build
   ↓
GitHub Pages
```

El workflow se encuentra en:

```text
.github/workflows/deploy.yml
```

No es necesario ejecutar manualmente el build para cada cambio de contenido.

Después de modificar una nota:

```bash
git add .
git commit -m "Update notes"
git push
```

GitHub Actions realizará el despliegue automáticamente.

---

# Agregar una nueva nota

No es necesario modificar ningún componente.

Simplemente crear un archivo:

```text
content/
└── Nueva_Area/
    └── nueva-nota.md
```

Escribir el contenido:

````markdown
# Nueva nota

Contenido de la investigación.

## Ejemplo

```bash
whoami
````

````

Guardar y ejecutar:

```bash
npm run dev
````

La nota aparecerá automáticamente en HACKLAB.

---

# Agregar una nueva sección

También se pueden crear nuevas áreas:

```text
content/
├── Python_Ofensivo/
├── Web/
├── Linux/
├── Active_Directory/
├── Networking/
└── Red_Team/
```

No es necesario modificar el código de React.

El explorador detectará automáticamente las nuevas carpetas y archivos Markdown.

---

# Filosofía del proyecto

HACKLAB está construido alrededor de una idea sencilla:

```text
Aprender
   ↓
Investigar
   ↓
Experimentar
   ↓
Documentar
```

El objetivo no es construir una plataforma compleja, sino disponer de un espacio rápido y organizado donde el conocimiento técnico pueda crecer junto con el proyecto.

El contenido es independiente de la interfaz.

Eso permite que HACKLAB evolucione sin convertir cada nueva nota en un cambio de código.

---

# Licencia

Este proyecto corresponde al laboratorio personal de **Z41F3R**.

El contenido y el código pueden evolucionar independientemente según las necesidades del proyecto.

