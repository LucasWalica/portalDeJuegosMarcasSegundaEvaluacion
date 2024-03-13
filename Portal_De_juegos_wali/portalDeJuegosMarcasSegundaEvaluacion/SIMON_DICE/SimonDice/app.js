let eleccionesSimon = [];
let eleccionesJugador = [];

// se añade al array
function seleccionar(data){
    eleccionesJugador.push(data);
}




document.addEventListener('DOMContentLoaded', function() {


    let idiomaSeleccionado = "es";
    let seleccionarIdioma = document.querySelector('#seleccionar-idioma');
    seleccionarIdioma.addEventListener('change', function(){
        idiomaSeleccionado = this.value;
        let simonDicetext = document.querySelector('#title');
        let btnInicio = document.querySelector('#butt');
        let roundaCounterText = document.querySelector('#counterRonda')
        let informacionText = document.querySelector('#h3')
        let graciasPorJugarText = document.querySelector('#thanks');
        simonDicetext.innerHTML = simonDice[idiomaSeleccionado];
        btnInicio.innerHTML = iniciarButton[idiomaSeleccionado];
        roundaCounterText.innerHTML = roundaCounter[idiomaSeleccionado];
        informacionText.innerHTML = informacion[idiomaSeleccionado];
        graciasPorJugarText.innerHTML = graciasPorJugar[idiomaSeleccionado];

        
    })


    // mejorar funcionalidad finalizar partida
    const popUp = document.createElement('div');
    popUp.id = 'popUp';
    popUp.innerHTML = mensajePerdido[idiomaSeleccionado]

    let rondas = 0;
    let contadorRondas = document.querySelector('#roundCounter');
    

    // se necesitará crear constantes de las cartas 
    function simonRandom(){

        const caballero = '<div class="charcont" id="cab"><div id="cabSalto"></div></div>';
        const demon = '<div class="charcont" id="demon"><div id="demSal"></div></div>'
        const lobo = '<div class="charcont" id="lobo"><div id="lobosalto"></div></div>';
        const samurai = '<div class="charcont" id="samurai"><div id="samcorrer"></div></div>';
        
        let opciones = [caballero, demon, lobo, samurai];
        // seleccion e insercion de datos en html + deicision simon
        let espacio = document.querySelector('#simonInsertar');
        let decision = opciones[(Math.floor(Math.random() * 4))];
        espacio.innerHTML = decision;
        let outputArr = '';
        if(decision===caballero){outputArr='caballero'}
        else if(decision===demon){outputArr='demon'}
        else if(decision===lobo){outputArr='lobo'}
        else if(decision===samurai){outputArr='samurai'}
        eleccionesSimon.push(outputArr);
    }
    

    // boton inicio
    let iniciarButt = document.querySelector('#butt');
    
    iniciarButt.addEventListener('click', function(){
        eleccionesJugador = [];
        eleccionesSimon = [];
        simonRandom();
        rondas=1;
        contadorRondas = document.querySelector('#roundCounter');
        contadorRondas.innerHTML = rondas;
    });

    function compararElecciones(){
        
        if(eleccionesJugador.join('')===eleccionesSimon.join('') && eleccionesJugador.length === eleccionesSimon.length){
            simonRandom();
            rondas++;
            contadorRondas = document.querySelector('#roundCounter');
            contadorRondas.innerHTML = rondas;
            eleccionesJugador = [];
        }
        
        else if(eleccionesJugador.join('')!==eleccionesSimon.join('') && eleccionesJugador.length===eleccionesSimon.length) {
            
            eleccionesJugador = [];
            eleccionesSimon = [];
            document.querySelector('.container').appendChild(popUp);
            const spanPuntuacion = document.querySelector('#puntuacion');
            spanPuntuacion.innerHTML = rondas;
            
            popUp.addEventListener('click', function(){
                const container = document.querySelector('.container');
                const popUpRemove = document.querySelector('#popUp');
                container.removeChild(popUpRemove);
            });

            rondas = 1;
            contadorRondas = document.querySelector('#roundCounter');
            contadorRondas.innerHTML = rondas;
            
            simonRandom();

        }
    }
    let botonesJugador = document.querySelectorAll('.charcont2');
    function agregarListeners(){
    // listeners de jugador
        botonesJugador.forEach(boton => {
            boton.addEventListener('click', function() {
                if(eleccionesJugador.length === rondas){
                    compararElecciones();
                }
                
                console.log("Jugador: "+eleccionesJugador.join(''));
                console.log("Bot:     "+eleccionesSimon.join(''));
            });
        });
    }
 
    agregarListeners();               
});


const simonDice = {"es":"Simon Dice", "en":"Simon says", "cz":"Simon říká" , "nl":"Simon zegt"}
const iniciarButton = {"es":"Iniciar Partida", "en":"Start Game" , "cz":"Začít hru" , "nl":"Start het spel"}
const roundaCounter = {"es":"Ronda Número: ", "en":"Round Number: " , "cz":"Číslo kola: " , "nl":"Rond getal: "} 
const informacion = {"es":"Pulsa en orden los personajes", "en":"Click the characters in order", "cz":"Klikněte na znaky v pořadí" , "nl":"Klik op de karakters in volgorde"}
const graciasPorJugar = {"es":"Gracias por jugar ", "en":"Thanks for playing" , "cz":"Díky za hraní" , "nl":"Bedankt voor het spelen"} 
const mensajePerdido = {
    "es":'<div id="popUp"><h2>Has perdido la partida en la ronda <span id="puntuacion"></span></h2><center><button id="aceptar">Aceptar</button></center></div>',
    "en":'<div id="popUp"><h2>You have lost the game in the round<span id="puntuacion"></span></h2><center><button id="aceptar">Accept</button></center></div>',
    "cz":'<div id="popUp"><h2>Jste prohráli v kole <span id="puntuacion"></span></h2><center><button id="aceptar">Přijmout</button></center></div>',
    "nl":'<div id="popUp"><h2>Je hebt de ronde verloren <span id="puntuacion"></span></h2><center><button id="aceptar">Aanvaarden</button></center></div>'
}