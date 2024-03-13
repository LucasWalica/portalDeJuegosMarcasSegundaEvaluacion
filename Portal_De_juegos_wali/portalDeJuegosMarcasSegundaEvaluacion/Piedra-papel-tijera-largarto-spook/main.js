// piedra pepl tijera largo spoock 
const jugables = ['piedra', 'papel', 'tijera', 'lagarto', 'spock'];

// loop de 5 partidas
let jugador_ganadas = 0;
let bot_ganadas = 0;

let seleccionHumano = '';
let seleccionBot = '';

function generarSeleccionBot(){
    seleccionBot = jugables[Math.floor(Math.random() * jugables.length)];
    console.log(seleccionBot);
}

let texto = '';

function verGanador(){
    if(seleccionHumano === seleccionBot){
        console.log("Empate");
        texto = seleccionBot +" empata contra "+ seleccionHumano;
    }
    else if((seleccionHumano === "piedra" && (seleccionBot==='tijera' || seleccionBot==='lagarto')) || 
            (seleccionHumano === "papel" && (seleccionBot==='piedra' || seleccionBot ==='spock')) || 
            (seleccionHumano==="tijera" && (seleccionBot==='papel' || seleccionBot==='lagarto')) || 
            (seleccionHumano==="lagarto" && (seleccionBot==='spock' || seleccionBot==='papel')) ||
            (seleccionHumano==="spock" && (seleccionBot==='tijera' || seleccionBot==='piedra'))){
                jugador_ganadas++;
                console.log("Gana humano");
                document.querySelector('#count_human').innerHTML = jugador_ganadas;
                texto = seleccionHumano + " gana contra "+ seleccionBot;
    }
    else if((seleccionHumano === "piedra" && (seleccionBot==='papel' || seleccionBot === 'spock')) || 
            (seleccionHumano === "papel" && (seleccionBot==='tijera' || seleccionBot==='lagarto')) || 
            (seleccionHumano==="tijera" && (seleccionBot==='piedra' || seleccionBot==='spock')) ||
            (seleccionHumano==="lagarto" && (seleccionBot==='piedra' || seleccionBot==='tijera')) || 
            (seleccionHumano==="spock" && (seleccionBot==='papel' || seleccionBot==='lagarto'))) {
                bot_ganadas++;
                console.log("Gana bot");
                document.querySelector('#count_bot').innerHTML = bot_ganadas;
                texto = seleccionHumano + " pierde contra "+ seleccionBot;
    }else {console.log("error");}
}


let partidasRestantes;


function asignarDatosJugador(data){
    

    if(partidasRestantes>0){
        seleccionHumano=data;
        generarSeleccionBot();
        verGanador();
        document.querySelector('#text').innerHTML = "<div id='text'>"+ texto+"</div>";
        seleccionBot = '';
        partidasRestantes--;
        document.querySelector('#counter').innerHTML =  "<h6>Juegos restantes " +partidasRestantes+ " </h6>";
    }

    if(partidasRestantes===0){
        document.querySelector('#counter').innerHTML =  "<h6>Juegos restantes " + 0 + " </h6>";
        if(document.querySelector('#count_human').innerHTML > document.querySelector('#count_bot').innerHTML){
            textofinal = "El jugador ha ganado.";
        }
        else if(document.querySelector('#count_human').innerHTML < document.querySelector('#count_bot').innerHTML){
            textofinal = "El bot ha ganado.";
        }
        else{textofinal =" Empate ";}
        document.querySelector('#textofinal').innerHTML = textofinal;
    
        return;
    }
}


function set(){
    document.querySelector('#text').innerHTML = "<div id='text'>"+"</div>";
    partidasJugadas = parseInt(prompt("Ingrese el numero de partidas a jugar: "));
    partidasRestantes = partidasJugadas;
    document.querySelector('#counter').innerHTML =  "<h6>Juegos restantes " +partidasRestantes+ " </h6>";
    count = 0;
    document.querySelector('#count_human').innerHTML = 0;
    jugador_ganadas = null;
    document.querySelector('#count_bot').innerHTML = 0;
    bot_ganadas=null;
    document.querySelector('#textofinal').innerHTML = '';
}

