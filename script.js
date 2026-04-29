let carouselInterval;

function abrirSobre(elemento) {
    if (!elemento.classList.contains('open')) {
        elemento.classList.add('open');
        
        // 1. Manejo del Scroll de la carta
        const carta = elemento.querySelector('.carta-contenido');
        if (carta) {
            carta.style.overflowY = 'hidden';
            setTimeout(() => {
                carta.style.overflowY = 'auto';
            }, 800);
        }

        // 2. Música
        const cancion = document.getElementById('miMusica');
        if (cancion) {
            cancion.volume = 0.4;
            cancion.play().catch(e => console.log("El navegador bloqueó el audio inicial"));
        }

        // 3. Efectos visuales y lógicos
        setInterval(crearBurbuja, 400);
        iniciarCarrusel();
        verificarDesbloqueo(); // Activamos la comprobación de la sorpresa
    }
}

// --- CARRUSEL DINÁMICO ---
let currentSlide = 0;

function iniciarCarrusel() {
    // Iniciamos el movimiento automático
    carouselInterval = setInterval(() => {
        moverCarrusel(1);
    }, 4000);
}

function moverCarrusel(direccion) {
    const track = document.getElementById('carousel-track');
    const items = track.querySelectorAll('.polaroid-item');
    
    currentSlide = (currentSlide + direccion + items.length) % items.length;
    
    track.scrollTo({
        left: currentSlide * track.offsetWidth,
        behavior: 'smooth'
    });

    // Si el usuario toca las flechas, reiniciamos el tiempo para que no salte rápido
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(() => moverCarrusel(1), 4000);
    }
}

// --- GENERADOR DE BURBUJAS ---
function crearBurbuja() {
    const container = document.getElementById('bubble-container');
    if (!container) return;

    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 20 + 10 + "px";
    b.style.width = b.style.height = size;
    b.style.left = Math.random() * 100 + "%";
    
    const dur = Math.random() * 3 + 4 + "s";
    b.style.animationDuration = dur;
    
    container.appendChild(b);
    setTimeout(() => b.remove(), 6000);
}

// --- CONTADOR REGRESIVO (Días, Horas, Minutos, Segundos) ---
const fechaEvento = new Date("June 14, 2026 11:00:00").getTime();

setInterval(() => {
    const ahora = new Date().getTime();
    const diff = fechaEvento - ahora;

    if (diff <= 0) {
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) countdownEl.innerHTML = "<b>¡ES HOY! 🧜‍♀️</b>";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    // Actualizamos los 4 campos (asegúrate que existan en el HTML)
    if(document.getElementById("days")) document.getElementById("days").innerText = d.toString().padStart(2, '0');
    if(document.getElementById("hours")) document.getElementById("hours").innerText = h.toString().padStart(2, '0');
    if(document.getElementById("minutes")) document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
    if(document.getElementById("seconds")) document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
}, 1000);

// --- LÓGICA DE LA SORPRESA ---
function verificarDesbloqueo() {
    const ahora = new Date();
    const fechaSorpresa = new Date(2026, 5, 7); // 7 de Junio de 2026
    
    const contenedor = document.getElementById('seccion-sorpresa');
    const contenido = document.getElementById('contenido-sorpresa');

    if (contenedor && ahora >= fechaSorpresa) {
        contenedor.classList.remove('bloqueado');
        contenedor.classList.add('desbloqueado');
        
        contenido.innerHTML = `
            <h3 style="color: #d81b60; font-family: 'Pacifico'; margin-bottom: 10px;">✨ ¡Sesión Especial! ✨</h3>
    <p style="font-size: 0.75rem; color: #666; margin-bottom: 10px;">(Mantén presionada una foto para guardarla)</p>
    <div class="grid-sesion">
        <img src="media/sesion1.jpg" alt="Laila 1" title="Guardar foto">
        <img src="media/sesion2.jpg" alt="Laila 2" title="Guardar foto">
        <img src="media/sesion3.jpg" alt="Laila 3" title="Guardar foto">
        <img src="media/sesion4.jpg" alt="Laila 4" title="Guardar foto">
    </div>
    <p style="font-size: 0.85rem; margin-top: 10px; color: #444;">¡Celebrando 4 años mágicos!</p>
`;
    }
}

