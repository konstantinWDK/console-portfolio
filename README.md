# 🖥️ Terminal Portfolio

Plantilla gratuita de portfolio con interfaz de terminal personalizable

## 🚀 Demo en Vivo

[https://webdesignerk.com/console-portfolio/](https://webdesignerk.com/console-portfolio/)

## 🎥 Video de Funcionalidad

[![Video demostrativo del portfolio terminal](https://webdesignerk.com/wp-content/uploads/2025/11/console-portfolio-usability-video.mp4)](https://webdesignerk.com/wp-content/uploads/2025/11/console-portfolio-usability-video.mp4)

*Ver video demostrativo de la funcionalidad del portfolio*

## 📸 Capturas de Pantalla

![Vista general del portfolio terminal](https://webdesignerk.com/wp-content/uploads/2025/11/console-portfolio-view.png)
*Interfaz principal del portfolio terminal*

![Sección de proyectos](https://webdesignerk.com/wp-content/uploads/2025/11/console-portfolio-best-template.png)
*Lista de proyectos con estilo de terminal*

![Sección de habilidades](https://webdesignerk.com/wp-content/uploads/2025/11/console-portfolio-best-js.png)
*Habilidades técnicas representadas como niveles de sistema*

## 📁 Estructura del Proyecto

```
console-portfolio/
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos y temas del terminal
│   ├── js/
│   │   └── script.js       # Lógica de navegación e interacciones
│   └── images/             # Recursos gráficos
├── index.html              # Estructura principal
├── .gitignore
├── LICENSE
└── README.md
```

## 🛠️ Instalación

```bash
git clone https://github.com/konstantinWDK/console-portfolio.git
cd console-portfolio
# Abre index.html en tu navegador
```

## ⚙️ Personalización

### 1. Cambio de Tema de Consola

Modifica las variables CSS en `assets/css/style.css`:

```css
/* Tema Ubuntu (por defecto) */
:root {
    --primary-color: #00ff00;
    --secondary-color: #ffff00;
    --background: #0c0c0c;
    --terminal-bg: #1a1a1a;
    --header-bg: #2d2d2d;
    --text-color: #ffffff;
    --cursor-color: #00ff00;
}

/* Tema Windows PowerShell */
.theme-windows {
    --primary-color: #0078d7;
    --secondary-color: #ffffff;
    --background: #012456;
    --terminal-bg: #001f3f;
    --header-bg: #005a9e;
    --text-color: #ffffff;
    --cursor-color: #0078d7;
}

/* Tema macOS Terminal */
.theme-macos {
    --primary-color: #ffffff;
    --secondary-color: #007aff;
    --background: #1d1d1f;
    --terminal-bg: #2d2d2f;
    --header-bg: #3d3d3f;
    --text-color: #ffffff;
    --cursor-color: #64d2ff;
}

/* Tema Matrix */
.theme-matrix {
    --primary-color: #00ff41;
    --secondary-color: #008f11;
    --background: #0a0a0a;
    --terminal-bg: #001100;
    --header-bg: #002200;
    --text-color: #00ff41;
    --cursor-color: #00ff41;
}
```

Para cambiar el tema, añade la clase correspondiente al elemento `.terminal` en `index.html`:

```html
<div class="terminal theme-windows">
```

### 2. Información Personal

**Sección About:**
```html
<div class="page" id="about">
    <div class="page-content">
        <h2>$ cat about.txt</h2>
        <div class="file-content">
            <p class="variable">NAME="Tu Nombre"</p>
            <p class="variable">ROLE="Tu Rol"</p>
            <p class="variable">LOCATION="Tu Ubicación"</p>
            <p class="variable">EXPERIENCE="Años de experiencia"</p>
        </div>
    </div>
</div>
```

**Sección Projects:**
```html
<div class="project-item" data-tech="tecnologias" data-status="production">
    <div class="project-header">
        <span class="permissions">drwxr-xr-x</span>
        <span class="size">256K</span>
        <span class="date">2024-01</span>
        <span class="name">tu-proyecto/</span>
        <span class="status status-live">🟢 LIVE</span>
    </div>
    <div class="project-body">
        <p class="description">Descripción de tu proyecto</p>
        <div class="tech-stack">
            <span class="tech">Tecnología 1</span>
            <span class="tech">Tecnología 2</span>
        </div>
    </div>
</div>
```

**Sección Skills:**
```html
<div class="skill-section">
    <p class="section-header">[Tu Categoría]</p>
    <div class="skill-list">
        <p class="skill-line">├── Tecnología........<span class="skill-level expert">[██████████] 90%</span></p>
    </div>
</div>
```

### 3. Comandos Personalizados

En `assets/js/script.js`, añade comandos personalizados:

```javascript
const customCommands = {
    'tu-comando': 'Respuesta personalizada',
    'github': 'https://github.com/tuusuario',
    'linkedin': 'https://linkedin.com/in/tuperfil'
};
```

## ⌨️ Funcionalidades

### Navegación por Teclado
- `1-5`: Navegar entre secciones
- `H`: Mostrar ayuda
- `Ctrl+L`: Limpiar terminal
- `Ctrl+C`: Interrumpir comando

### Comandos de Terminal
- `cd [sección]`: Navegar a sección
- `ls`: Listar contenido
- `help`: Mostrar ayuda
- `clear`: Limpiar pantalla
- `lang [en|es]`: Cambiar idioma

## 📱 Compatibilidad

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Dispositivos móviles

## 📄 Licencia

MIT License - Uso gratuito para proyectos personales y comerciales
