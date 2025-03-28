// Variables Globales
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let mascotaJugadorId = "";
let juegoActivo = true;

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = "none";

    let opcionesFinal = document.getElementById("opciones-final");
    opcionesFinal.style.display = "none";

    // Reiniciamos la selección de mascotas
    let radioButtons = document.querySelectorAll('input[name="mascota"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });

    let botonMascotaJugador = document.getElementById("boton-mascota");
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.addEventListener("click", ataqueFuego);

    let botonAgua = document.getElementById("boton-agua");
    botonAgua.addEventListener("click", ataqueAgua);

    let botonTierra = document.getElementById("boton-tierra");
    botonTierra.addEventListener("click", ataqueTierra);

    let botonReiniciar = document.getElementById("boton-reiniciar");
    botonReiniciar.addEventListener("click", reiniciarJuego);

    let botonInicio = document.getElementById("boton-inicio");
    botonInicio.addEventListener("click", volverAlInicio);

    // Agregar evento para resaltar selección de mascota
    let tarjetas = document.querySelectorAll(".tarjeta-de-mokepon");
    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            tarjetas.forEach(t => t.classList.remove("seleccionada"));
            tarjeta.classList.add("seleccionada");
            tarjeta.querySelector("input").checked = true;
        });
    });

    // Deshabilitar botones de ataque inicialmente
    desactivarAtaques(true);
}

function desactivarAtaques(desactivar) {
    const botonesAtaque = document.querySelectorAll(".boton-ataque");
    juegoActivo = !desactivar;
    botonesAtaque.forEach(boton => boton.disabled = desactivar);
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    let spanMascotaJugador = document.getElementById("mascota-jugador");

    let radioButtons = document.querySelectorAll('input[name="mascota"]');
    let mascotaSeleccionada = false;

    radioButtons.forEach((radio) => {
        if (radio.checked) {
            mascotaJugadorId = radio.id;
            spanMascotaJugador.innerHTML = radio.nextElementSibling.innerText;
            sectionSeleccionarMascota.style.display = "none";
            sectionSeleccionarAtaque.style.display = "flex";
            seleccionarMascotaEnemigo();
            desactivarAtaques(false);
            mascotaSeleccionada = true;
        }
    });

    if (!mascotaSeleccionada) {
        alert("Debes seleccionar una Mascota");
    }
}

function seleccionarMascotaEnemigo() {
    let nombres = ["Hipodoge", "Capipepo", "Ratigueya", "Conefofo", "Serpitonsky", "The-Goat"];
    let mascotaAleatorio = aleatorio(0, nombres.length - 1);
    document.getElementById("mascota-enemigo").innerHTML = nombres[mascotaAleatorio];
}

function ataqueFuego() {
    if (!juegoActivo) return;
    ataqueJugador = "FUEGO";
    agregarAtaqueJugador("🔥");
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    if (!juegoActivo) return;
    ataqueJugador = "AGUA";
    agregarAtaqueJugador("💧");
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    if (!juegoActivo) return;
    ataqueJugador = "TIERRA";
    agregarAtaqueJugador("🌱");
    ataqueAleatorioEnemigo();
}

function agregarAtaqueJugador(emoji) {
    document.getElementById("ataques-del-jugador").innerHTML += emoji;
}

function agregarAtaqueEnemigo(emoji) {
    document.getElementById("ataques-del-enemigo").innerHTML += emoji;
}

function ataqueAleatorioEnemigo() {
    let ataques = ["FUEGO", "AGUA", "TIERRA"];
    let emojis = ["🔥", "💧", "🌱"];
    let indice = aleatorio(0, 2);
    ataqueEnemigo = ataques[indice];
    agregarAtaqueEnemigo(emojis[indice]);
    combate();
    revisarVidas();
}

function combate() {
    if (ataqueEnemigo === ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador === "FUEGO" && ataqueEnemigo === "TIERRA") ||
        (ataqueJugador === "AGUA" && ataqueEnemigo === "FUEGO") ||
        (ataqueJugador === "TIERRA" && ataqueEnemigo === "AGUA")
    ) {
        crearMensaje("GANASTE");
        vidasEnemigo--;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
    }
    document.getElementById("vidas-jugador").innerHTML = vidasJugador;
    document.getElementById("vidas-enemigo").innerHTML = vidasEnemigo;
}

function revisarVidas() {
    if (vidasJugador <= 0 || vidasEnemigo <= 0) {
        desactivarAtaques(true);
        document.getElementById("opciones-final").style.display = "flex";
        crearMensaje(vidasJugador <= 0 ? "¡HAS PERDIDO EL JUEGO!" : "¡HAS GANADO EL JUEGO!");
    }
}

function crearMensaje(resultado) {
    document.getElementById("resultado").innerHTML = resultado;
}

function reiniciarJuego() {
    location.reload();
}

function volverAlInicio() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);