function obtenerMinas(){
    let inputMinas = document.getElementById('numMinas').value;
    return inputMinas;
}

// cargando el mapa
document.addEventListener('DOMContentLoaded', function() {    
    // valores del mapa
    const mapa = [];
    let minasJuego = 0;
    let vidasJugador = 10;
    countMinas = obtenerMinas();

    // mejorar para que pueda ingresar un numero de minas a generar 
    // y que se generen de una forma equitativa en todo el tablero
    function loadMapValues(){
        let countMinas =obtenerMinas();
        console.log(countMinas);

        for(let i=0; i<10; i++){
            let row = [];
            for(let j=0; j<10; j++){
                
                let content = Math.round(Math.random()*3);

                if(content===1 && countMinas>0){minasJuego++; countMinas--;}
                
                else if(content===1 && countMinas===0){content=0;}

                row.push(content);
            }
            mapa.push(row);
        }
    }

    // generar grid
    let button = document.getElementById("generate");
    button.addEventListener('click', function(){
        
        loadMapValues();    
        minasJuego = obtenerMinas();
        vidasJugador = 10;
        var grid = document.querySelector('.grid');
        grid.innerHTML ="";

        loadMapValues();
        console.log("Minas juego: ",minasJuego)

        // cargado el grid con elementos y clases 0 y 1
        for(let i=0; i<10; i++){
            for(let j=0; j<10; j++){
                let block = document.createElement('div');
                block.classList.add('block');
                
                if(mapa[i][j]===1){
                    block.classList.add('mina'); 
                }
                else if(mapa[i][j]===0 ||  mapa[i][j]===2 || mapa[i][j]===3){
                    block.classList.add('noMina');
                    
                }
                // funcion de click
                block.addEventListener('click', function(){
                    click(block, i, j);
                });
                
                grid.append(block);
            }
        }
           
        let minas_div = document.querySelector('#minas_count');
        minas_div.innerHTML =  obtenerMinas();

        let vidas = document.querySelector('#vidasRestas');
        vidas.innerHTML = vidasJugador;


    })

    function contar(i,j){
        let count = 0;

        for(let x = Math.max(0, i-1); x<=Math.min(9, i+1); x++){
            for(let y=Math.max(0, j-1); y<=Math.min(9, j+1); y++){
                if(mapa[x][y]===1){
                    count++;
                }
            }
        }
        return count;
    }    

    
    // funcion click
    function click(block, i, j){

        if(block.classList.contains('mina')){
            
            if(vidasJugador>0){
                vidasJugador--;
                let vidas = document.querySelector('#vidasRestas');
                vidas.innerHTML = vidasJugador;
                block.classList.remove('mina');
                block.classList.add('explosion');
            }
            else if(vidasJugador===0){
                var grid = document.querySelector('.grid');
                grid.innerHTML="<h1>Has perdido</h1><h2>Vuelve a generar un nuevo mapa</h2><h3>Si quieres jugar en el mismo mapa simplemente pulsa generate, si quieres cambiar pulsa f5 y pulsa generate pudiendo cambiar el numero de minas</h3>";
            }
        
        }else if(block.classList.contains('noMina')){

            let minasCercanas = contar(i, j);
            block.innerHTML=minasCercanas;
            block.classList.add('bandera');
        }
    }

    // desactivar mina
    document.body.addEventListener("mousedown", event=>{
        if(event.button===2){
            if(event.target.classList.contains("mina") || event.target.classList.contains("explosion")){
                    event.target.classList.remove('mina');                
                    event.target.classList.add("minaLimpiada")
                    minas_div = document.querySelector('#minas_count');
                    countMinas--;
                    minas_div.innerHTML = countMinas;
                    if(countMinas===0){
                        var grid = document.querySelector('.grid');
                        grid.innerHTML = "<h1>Has ganado y limpiado todas las minas</h1><br><h2>Congratulaciones</h2><br><h2>Pulsa f5 y generate para volver a jugar</h2>";
                    }
            }
        }
    });

        
    // si clase 1=> Al pulsar mostrar mina y quitar una vida
    // si clase 0=> Al pulsar banderita y mostrar numeros?
});

