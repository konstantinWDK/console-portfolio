# 🖥️ Terminal Portfolio

> Un recurso gratuito para los amantes del código que quieren hacer su portfolio al estilo consola

![Terminal Portfolio](https://img.shields.io/badge/Terminal-Portfolio-brightgreen?style=for-the-badge&logo=terminal)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎯 ¿Qué es Terminal Portfolio?

Terminal Portfolio es una plantilla completamente gratuita que simula una terminal de línea de comandos para mostrar tu portfolio de desarrollador de una manera única y atractiva. Perfecta para desarrolladores que quieren destacar con un diseño retro y funcional.

## ✨ Características

- 🖥️ **Interfaz de terminal realista** con efectos de parpadeo del cursor
- 📱 **Completamente responsive** - funciona en desktop, tablet y móvil
- ⌨️ **Navegación por teclado** - usa las teclas 1-5 para navegar
- 🎨 **Animaciones suaves** con efectos de transición
- 📝 **Historial de comandos** interactivo
- 🎭 **Easter eggs** ocultos para desarrolladores curiosos
- 🌈 **Tema matrix/hacker** con colores verde neón
- 📋 **Formulario de contacto** funcional
- 🎯 **Fácil personalización** - solo edita el HTML

## 🚀 Demo en Vivo

Visita la demo para ver el portfolio en acción: [https://konstantinwdk.github.io/console-portfolio/](https://konstantinwdk.github.io/console-portfolio/)

## 📁 Estructura del Proyecto

```
console-portfolio/
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos del terminal y animaciones
│   ├── js/
│   │   └── script.js       # Lógica de navegación e interacciones
│   └── images/             # Imágenes y recursos gráficos
├── docs/                   # Documentación adicional
├── index.html              # Estructura principal del portfolio
├── .gitignore             # Archivos ignorados por Git
├── LICENSE                # Licencia MIT
└── README.md              # Este archivo
```

## 🛠️ Instalación y Uso

### Opción 1: Descarga Directa
1. Descarga los archivos del repositorio
2. Personaliza tu información en `index.html`
3. Abre `index.html` en tu navegador
4. ¡Listo! Tu portfolio está funcionando

### Opción 2: Clonación
```bash
git clone https://github.com/konstantinWDK/console-portfolio.git
cd console-portfolio

# Opción 1: Abrir directamente
# Abre index.html en tu navegador favorito

# Opción 2: Servidor local (opcional)
python -m http.server 8000
# Luego ve a http://localhost:8000
```

## ⚙️ Personalización

### 1. Información Personal
Edita las siguientes secciones en `index.html`:

**Sección About (`id="about"`):**
```html
<p>Name: [Tu Nombre]</p>
<p>Role: [Tu Rol]</p>
<p>Location: [Tu Ubicación]</p>
<p>Experience: [Años de experiencia]</p>
```

**Sección Projects (`id="projects"`):**
Añade tus proyectos modificando los elementos `.project-item`:
```html
<div class="project-item">
    <span class="permissions">drwxr-xr-x</span>
    <span class="size">4.2K</span>
    <span class="date">Jan 15</span>
    <span class="name">tu-proyecto/</span>
    <p class="description">Descripción de tu proyecto</p>
</div>
```

**Sección Skills (`id="skills"`):**
Actualiza el JSON con tus tecnologías:
```json
{
  "frontend": {
    "languages": ["HTML5", "CSS3", "JavaScript"],
    "frameworks": ["React", "Vue.js"],
    "tools": ["Webpack", "Sass"]
  }
}
```

**Sección Contact (`id="contact"`):**
```bash
echo "Email: tu.email@ejemplo.com"
echo "GitHub: https://github.com/tuusuario"
echo "LinkedIn: https://linkedin.com/in/tuperfil"
```

### 2. Colores y Tema
Modifica las variables CSS en `assets/css/style.css`:
```css
:root {
    --primary-color: #00ff00;    /* Verde terminal */
    --secondary-color: #ffff00;  /* Amarillo */
    --background: #0c0c0c;       /* Negro */
    --terminal-bg: #1a1a1a;     /* Gris oscuro */
}
```

### 3. ASCII Art
Cambia el logo ASCII en la sección home por el tuyo:
```html
<pre class="ascii-art">
 ____   ___  ____ _____ _____ ___  _     ___ ___  
|  _ \ / _ \|  _ \_   _|  ___/ _ \| |   |_ _/ _ \ 
| |_) | | | | |_) || | | |_ | | | | |    | | | | |
|  __/| |_| |  _ < | | |  _|| |_| | |___ | | |_| |
|_|    \___/|_| \_\|_| |_|   \___/|_____|___\___/
</pre>
```

## ⌨️ Comandos y Atajos

| Comando | Descripción |
|---------|-------------|
| `1-5` | Navegar entre secciones |
| `H` | Mostrar ayuda |
| `Ctrl+L` | Limpiar terminal |
| `Ctrl+C` | Interrumpir comando |
| `Ctrl+Shift+I` | Easter egg para desarrolladores |

### Comandos de Terminal Simulados
- `cd [sección]` - Navegar a una sección
- `ls -la` - Listar contenido
- `cat [archivo]` - Mostrar contenido
- `help` - Mostrar ayuda
- `clear` - Limpiar pantalla

## 🎨 Características Técnicas

### HTML
- Estructura semántica y accesible
- Uso de data attributes para navegación
- Formulario de contacto con validación

### CSS
- Diseño responsive con media queries
- Animaciones CSS puras (no librerías externas)
- Efectos de terminal auténticos
- Scrollbar personalizado

### JavaScript
- Programación orientada a objetos
- Navegación SPA (Single Page Application)
- Historial de comandos dinámico
- Easter eggs y efectos especiales
- Validación de formularios

## 🔧 Funcionalidades Avanzadas

### 1. Sistema de Navegación
```javascript
// Navegación por teclado
const keyCommands = {
    '1': 'home',
    '2': 'about', 
    '3': 'projects',
    '4': 'skills',
    '5': 'contact'
};
```

### 2. Historial de Comandos
```javascript
addCommandToHistory(prompt, command, output) {
    // Simula la ejecución de comandos
    // Mantiene historial persistente
}
```

### 3. Easter Eggs
```javascript
const easterEggs = {
    'sudo': 'Nice try, but you\'re not root here! 😏',
    'rm -rf /': 'Access denied. This portfolio is protected! 🛡️',
    // ... más comandos ocultos
};
```

## 📱 Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móviles iOS/Android

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Este es un recurso gratuito para la comunidad:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Ideas para Contribuir
- Nuevos temas de colores
- Más comandos de terminal
- Efectos visuales adicionales
- Mejoras en la accesibilidad
- Traduciones a otros idiomas

## 📄 Licencia

Este proyecto es **completamente gratuito** y está bajo la Licencia MIT. Esto significa que puedes:

- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Uso privado

Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🌟 Créditos

Creado con ❤️ para la comunidad de desarrolladores que aman el estilo retro de las terminales.

### Inspiración
- Terminales Unix/Linux
- Películas de hackers de los 90s
- Estética cyberpunk/matrix

## 📞 Soporte

¿Tienes preguntas o necesitas ayuda?

- 🐛 **Reportar bugs**: Abre un issue en GitHub
- 💡 **Sugerencias**: Comparte tus ideas en las discussions
- 📧 **Contacto**: [tu-email@ejemplo.com]

## 🚀 Roadmap

### Versión Actual (v1.0)
- [x] Interfaz básica de terminal
- [x] Navegación por secciones
- [x] Diseño responsive
- [x] Formulario de contacto

### Próximas Versiones
- [ ] Modo oscuro/claro toggle
- [ ] Más temas de colores
- [ ] Integración con APIs
- [ ] Sistema de plugins
- [ ] Editor de comandos en vivo

---

**¿Te gusta este proyecto?** ⭐ ¡Dale una estrella en GitHub y compártelo con otros desarrolladores!

**¿Lo estás usando?** 📢 ¡Nos encantaría ver tu portfolio! Comparte el enlace con nosotros.