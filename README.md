# Unas Palabras para Ti 🌹

Este proyecto es una página web interactiva creada como un regalo especial para alguien muy importante. Combina elementos visuales, animaciones y música para transmitir un mensaje sincero y emotivo.

---

## Características principales ✨

- **Animaciones personalizadas**: Flores que crecen, una carta que se abre y más.
- **Reproductor de música integrado**: Con canciones seleccionadas especialmente.
- **Interactividad**: El usuario puede interactuar con la página para descubrir mensajes ocultos.
- **Diseño responsive**: Funciona en dispositivos móviles y de escritorio.
- **Tema claro/oscuro**: Adaptable a las preferencias del usuario.

---

## Capturas de pantalla 📸

![Página de inicio](./public/screenshots/HomeDark.png)

![Página de inicio completada](./public/screenshots/HomeDarkCompleted.png)

![Animación de la flor principal](./public/screenshots/MainFlower.png)

![Animación de la flor y carta](./public/screenshots/FlowerCard.png)

![Dialog de la música](./public/screenshots/MusicDialog.png)

![Dialog de la carta](./public/screenshots/CardDialog.png)

---

## Estructura del proyecto 📂

```plaintext
alba2809-valentines-present/
├── README.md
├── index.html
├── package.json
├── public/
│   ├── images/
│   │   ├── Date 2.webp
│   │   ├── Eve.webp
│   │   ├── I wont give up.webp
│   │   ├── La Bestia.webp
│   │   ├── Mala Maña.webp
│   │   ├── Nandemonaiya.webp
│   │   ├── One Summers Day.webp
│   │   └── Perfect.webp
│   └── music/
│       ├── Date 2.ogg
│       ├── Eve.ogg
│       ├── I wont give up.ogg
│       ├── La Bestia.ogg
│       ├── Mala Maña.ogg
│       ├── Nandemonaiya.ogg
│       ├── One Summers Day.ogg
│       └── Perfect.ogg
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   └── fonts/
    │       └── Kiss Me Quick.ttf
    ├── components/
    │   ├── AnimatedFace.jsx
    │   ├── AudioPlayer.jsx
    │   ├── Slider.jsx
    │   ├── ThemeToggle.jsx
    │   ├── AuthPage/
    │   │   ├── Decorations.jsx
    │   │   ├── InputLetter.jsx
    │   │   ├── MessageHelp.jsx
    │   │   ├── MessageTimer.jsx
    │   │   └── ReorderWord.jsx
    │   ├── FlowerPage/
    │   │   ├── AnimatedCard.jsx
    │   │   ├── CardDialog.jsx
    │   │   ├── GlassFlower.jsx
    │   │   ├── MainFlower.jsx
    │   │   ├── SecondaryFlowers.jsx
    │   │   └── ValentineCard.jsx
    │   └── styles/
    │       ├── AnimatedFace.css
    │       ├── Arrow.css
    │       ├── FlowerAnimated.css
    │       ├── Slider.css
    │       └── ValentineCard.css
    ├── data/
    │   ├── musics.json
    │   └── passwords.json
    ├── hooks/
    │   └── useAudioPlayer.js
    └── pages/
        ├── Auth.jsx
        ├── Flower.jsx
        ├── Loading.jsx
        ├── Test.jsx
        └── VerifyAuth.jsx
  ```

---

## Tecnologías utilizadas 🛠️

- **React**: Biblioteca principal para la construcción de la interfaz.
- **Vite**: Herramienta de construcción rápida.
- **Tailwind CSS**: Para estilos personalizados y responsive.
- **Framer Motion**: Para animaciones fluidas y dinámicas.
- **React Router**: Para la navegación entre páginas.
- **React Icons**: Para íconos visuales.

---

## Cómo ejecutar el proyecto 🚀

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Alba2809/valentines-present
   ```
   
2. Instala las dependencias:
   ```bash
   npm install
   ```
      
3. Crea el archivo .env y agrega el texto para la carta.
   
4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   
5. Abre tu navegador y visita:
   ```bash
   http://localhost:5173/
   ```

---

## Despliegue 🌐

El proyecto está configurado para desplegarse en Vercel. [Ir a la web](https://a-present-for-you.vercel.app/)

---

## Extras 🙌

- **Música**: Canciones seleccionadas de artistas como Radwimps, Ed Sheeran y más.
- **Fuentes**: Tipografías especiales para un toque único.
- **Animaciones**: Diseñadas con ❤️ para transmitir emociones.

