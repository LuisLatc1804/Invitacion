let carouselInterval;

function abrirSobre(elemento) {
    if (!elemento.classList.contains('open')) {
        elemento.classList.add('open');

        // Música
        const cancion = document.getElementById('miMusica');
        if (cancion) {
            cancion.volume = 0.5;
            cancion.play();
        }

        // Burbujas
        setInterval(crearBurbuja, 500);

        // Carrusel
        iniciarCarrusel();
    }
}

function iniciarCarrusel() {
    const track = document.getElementById('carousel-track');
    let index = 0;
    const items = track.querySelectorAll('.polaroid-item');
    
    carouselInterval = setInterval(() => {
        index = (index + 1) % items.length;
        track.scrollTo({ left: index * track.offsetWidth, behavior: 'smooth' });
    }, 3000);
}

function crearBurbuja() {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 20 + 10 + "px";
    b.style.width = b.style.height = size;
    b.style.left = Math.random() * 100 + "%";
    const dur = Math.random() * 3 + 4 + "s";
    b.style.animationDuration = dur;
    document.getElementById('bubble-container').appendChild(b);
    setTimeout(() => b.remove(), 6000);
}

// Contador
const fecha = new Date("June 7, 2026 16:00:00").getTime();
setInterval(() => {
    const ahora = new Date().getTime();
    const diff = fecha - ahora;
    if (diff < 0) return;
    document.getElementById("days").innerText = Math.floor(diff / (1000*60*60*24)).toString().padStart(2,'0');
    document.getElementById("hours").innerText = Math.floor((diff % (1000*60*60*24)) / (1000*60*60)).toString().padStart(2,'0');
}, 1000);