

// cada dia 4 personajes -> 3 dias
// cada personaje genera un mensaje del jefe 
// cada persona tiene un mensaje propio  y un outcom en el oro de la taverna y una descripcion 
// idiomas 4 => ingles, español, checo, holandes

// #personaje_dice #char_name #description #body_char #face_hablante #reject #accept   
document.addEventListener("DOMContentLoaded", function() {
    
    let idioma_seleccionado = "es"
    document.getElementById('seleccionar-idioma').addEventListener('change', function(){
        idioma_seleccionado = this.value
        cargarCuerpo()
        // botones
        let butAcceptInform = document.getElementById('acceptInform');
        butAcceptInform.innerHTML = botonAceptarInforme[idioma_seleccionado];
        let acceptButton = document.getElementById('accept');
        acceptButton.innerHTML = aceptButton[idioma_seleccionado];
        let rejectButton =document.getElementById('reject');
        rejectButton.innerHTML = rechazarButton[idioma_seleccionado]; 
        // resultados informe 
        let informeh1 = document.getElementById('resultadosInforme');
        informeh1.innerHTML = informeH1[idioma_seleccionado]
        let textSh1 = document.getElementById('startH1');
        let textSh2 = document.getElementById('startH2');
        let textSh3 = document.getElementById('startH3');
        textSh1.innerHTML = textStartH1[idioma_seleccionado];
        textSh2.innerHTML = textStartH2[idioma_seleccionado];
        textSh3.innerHTML = textStartH3[idioma_seleccionado];
        let signButtn = document.getElementById('sign');
        signButtn.innerHTML = signButton[idioma_seleccionado]
        let outButton = document.querySelector('#home');
        outButton.innerHTML = quemarContratoButton[idioma_seleccionado]
    
    })  
    
    

    // para diseñar los estilos de quedarse sin vinos y quedarse sin vidas
    const hud = document.getElementById('test')
    hud.style.display= 'none';
    
    // start
    let sign = document.querySelector('#sign');
    sign.addEventListener('click', function(){
        hud.style.display = 'block'
        const start = document.querySelector('.start');
        start.parentElement.removeChild(start);
    })

    // count_personajes pasados
    let count = 0;

    // recursos popUP
    let vidasPopUp = document.querySelector('#vidas');
    let vinosPopUp = document.querySelector('#wines');
    let monedasPopUp = document.querySelector('#coins');  
    // recursos barra superior 
    let vidas_superior = document.querySelector('#heart_count')
    let vinos_superior = document.querySelector('#wine_count')
    let coin_document = document.querySelector('#amount');
    // recursos juego
    let count_monedas = 0;  
    let count_vidas = 10;
    let count_vinos = 100;
    
    vidas_superior.innerHTML = count_vidas;
    vinos_superior.innerHTML = count_vinos;
    coin_document.innerHTML = count_monedas;
    
    let message =  document.querySelector('#personaje_dice')
    let name = document.querySelector('#char_name')
    let body = document.querySelector('#body_char')
    let face = document.querySelector('#face_hablante')
    let text_jefe = document.querySelector("#text_jefe");
    message.innerHTML = personajes[count].mensaje[idioma_seleccionado]
    name.innerHTML = personajes[count].nombre
    body.style.backgroundImage = `url('${personajes[count].body}')`;
    face.src = personajes[count].face


    let acceptBut = document.querySelector('#accept')
    acceptBut.addEventListener('click', function(event){
        event.preventDefault();
        checkFinal();
        count++;
        cargarCuerpo()
        count_monedas += personajes[count-1].dineroTaberna
        coin_document.innerHTML = count_monedas;
        loadCommentEntrar();
        check()
        noneVisibleButtons();
    })


    // popUP
    function loadCommentEntrar(){
  
        let popUp = document.querySelector('#popUp');
        popUp.style.visibility = "visible";
        
        text_jefe.innerHTML = personajes[count-1].textoJefeEntrar[idioma_seleccionado];
        
        vidasPopUp.innerHTML = 0
        
        vinosPopUp.innerHTML = personajes[count-1].vinos
        monedasPopUp.innerHTML = personajes[count-1].dineroTaberna
        vinosPopUp.innerHTML = personajes[count-1].vinos
        vinos_superior.innerHTML -= personajes[count-1].vinos
    }

    function loadCommentNoEntrar(){
        let popUp = document.querySelector('#popUp');
        popUp.style.visibility = "visible";

        text_jefe.innerHTML = personajes[count-1].mensajeRechazar[idioma_seleccionado];
        
        vidas_superior.innerHTML -= personajes[count-1].vidaRes
        vidasPopUp.innerHTML = personajes[count-1].vidaRes

        vinosPopUp.innerHTML = 0;
        monedasPopUp.innerHTML = 0;
    }

    function cargarCuerpo(){
            message.innerHTML = personajes[count].mensaje[idioma_seleccionado]
            name.innerHTML = personajes[count].nombre
            body.style.backgroundImage = `url('${personajes[count].body}')`;
            face.src = personajes[count].face
    }

    let rejectBut = document.querySelector('#reject')
    rejectBut.addEventListener('click', function(event){
        event.preventDefault();
        checkFinal();
        count++;
        cargarCuerpo()
        loadCommentNoEntrar();
        check();  
        noneVisibleButtons()      
    })

    // aceptar popUp
    let acceptInform = document.querySelector('#acceptInform');
    acceptInform.addEventListener('click', function(){
        let popUp = document.querySelector('#popUp');
        popUp.style.visibility = "hidden";
        rejectBut.style.visibility ="visible";
        acceptBut.style.visibility="visible"
    })

    function noneVisibleButtons(){
        rejectBut.style.visibility = "hidden";
        acceptBut.style.visibility = "hidden";
    }
  
    function remove(){
        const hud = document.getElementById('test')
        hud.parentElement.removeChild(hud);
        let popUp = document.querySelector('#popUp');
        popUp.style.visibility = "hidden";
    }

    function check(){
        checkFinal()
        checkResources()
    }
    function checkFinal(){
        if(count>=personajes.length && coin_document.innerHTML>0){
            remove();
            document.body.innerHTML += taberna_positivo[idioma_seleccionado];
        }
        if(count>=personajes.length && coin_document.innerHTML<=0){
            remove();
            document.body.innerHTML += taberna_no_dinero[idioma_seleccionado];
        }
    }
      // mejorar con addChildern popChildren
      function checkResources(){
        if(vinos_superior.innerHTML<=0){
            remove()
            document.body.innerHTML+=vino_no_restante[idioma_seleccionado]
        }
        if(vidas_superior.innerHTML<=0){
            remove()
            document.body.innerHTML+= vidas_no_restante[idioma_seleccionado]
        }
    } 

});
  

// divs de final de partida
const vino_no_restante = {
    "es":'<div class="wine_lost"><h1>Nos hemos quedado sin vino elfico</h1><h2>Ha sido un dia muy exigente para los camareros y los bardos, la clientela ha sido muy amplia y han consumido todo</h2></div>',
    "en":'<div class="wine_lost"><h1>We have run out of elven wine</h1><h2>It has been a very demanding day for the waiters and bards, the clientele has been very large and they have consumed everything</h2></div>',
    "cz":'<div class="wine_lost"><h1>Došlo nám elfí víno</h1><h2>Pro číšníky a bardy to byl velmi náročný den, klientela byla velmi početná a zkonzumovali vše< /h2 ></div>',
    "nl":'<div class="wine_lost"><h1>We hebben geen elvenwijn meer</h1><h2>Het was een zeer veeleisende dag voor de obers en barden, de klantenkring was erg groot en ze hebben alles opgegeten< /h2 ></div>'
}
const vidas_no_restante ={
    "es":' <div class="life_lost"><h1>Has muerto tras tantos incidentes con clientes insatisfechos</h1><h2>Como te dijo Erdiran es un trabajo dificil por el trato con personas de todo tipo</h2></div>',
    "en": ' <div class="life_lost"><h1>You have died after so many incidents with dissatisfied customers</h1><h2>As Erdiran told you, it is a difficult job because of dealing with people of all kinds</h2></div >',
    "cz": ' <div class="life_lost"><h1>Has muerto tras tantos incidentes con clientes insatisfechos</h1><h2>Como te dijo Erdiran es un trabajo difícil por el trato con personas de todo tipo</h2></div >',
    "nl":' <div class="life_lost"><h1>Je bent gestorven na zoveel incidenten met ontevreden klanten</h1><h2>Zoals Erdiran je vertelde, is het een moeilijke klus vanwege het omgaan met allerlei soorten mensen</h2 ></div >'
}
const taberna_no_dinero  ={
    "es":'<div class="negative_coins"><h1>Tras todo el dia te das cuenta de que la tienda ha perdido dinero</h1><h2>Has dejado pasar a todo tipo de personas no deseables que han aruinado la taberna mas famosa de todo el reino</h2></div>',
    "en":'<div class="negative_coins"><h1>After the whole day you realize that the store has lost money</h1><h2>You have let in all kinds of undesirable people who have ruined the most famous tavern of the whole kingdom</h2></div>',
    "cz":'<div class="negative_coins"><h1>Po celém dni si uvědomíte, že obchod přišel o peníze</h1><h2>Vpustili jste dovnitř všechny druhy nežádoucích lidí, kteří zničili nejslavnější krčmu celého království</h2></div>',
    "nl":'<div class="negative_coins"><h1>Na een hele dag realiseer je je dat de winkel geld heeft verloren</h1><h2>Je hebt allerlei ongewenste mensen binnengelaten die de beroemdste taverne van het geheel hebben verpest koninkrijk</h2></div>'
}
const taberna_positivo ={
    "es":'<div class="positive_coins"><h1>Tras todo el dia y el recuento de caja has ganado dinero</h1><h2>Erdiran está feliz de tu labor y te da un dinero extra por su excelente labor</h2></div>',
    "en":'<div class="positive_coins"><h1>After the whole day and the cash count you have earned money</h1><h2>Erdiran is happy with your work and gives you extra money for your excellent work</h2 ></div>',
    "cz":'<div class="positive_coins"><h1>Po celém dni a počtu peněz jste vydělali peníze</h1><h2>Erdiran je s vaší prací spokojený a dává vám peníze navíc za vaši skvělou práci</h2 > </div>',
    "nl":'<div class="positive_coins"><h1>Na de hele dag en het tellen van de contanten heb je geld verdiend</h1><h2>Erdiran is blij met je werk en geeft je extra geld voor je uitstekende werk</h2 > </div>'
} 



const botonAceptarInforme ={
    "es":"Aceptar informe",
    "en":"Accept report",
    "cz":"Přijmout zprávu",
    "nl":"Rapport accepteren",
} 
const aceptButton = {
    "es":"Dejar entrar",
    "en":"Let in",
    "cz":"Pustit dovnitř",
    "nl":"Binnenlaten"
}
const rechazarButton = {
    "es":"No dejar entrar",
    "en":"Dont let in",
    "cz":"Nepustit dovnitř",
    "nl":"Laat niet binnen"
}
const informeH1 = {
    "es":"Informe del cliente",
    "en":"Client Report",
    "cz":"Klientská zpráva",
    "nl":"Klant rapport"
}
const quemarContratoButton={
    "es":"Quemar Contrato",
    "en":"Burn Contract",
    "cz":"Vypálit smlouvu",
    "nl":"Brandcontract"
}

const textStartH1 = {
    "es":"Bienvenido a la taberna mas famosa de todo el reino",
    "en":"Welcome to the most famous tavern in the entire kingdom",
    "cz":"Vítejte v nejslavnější taverně v celém království",
    "nl":"Welkom in de beroemdste taverne van het hele koninkrijk"
}
const textStartH2 = {
    "es":" Me presento, soy Erdiran, el jefe, necesitaba a alguien que se ocupase de dejar entrar o no, a los clientes, confio en ti \n Tenemos que tener cuidado con las reservas de vino y tu vida, no vaya a ser que se lo beban todo o al no dejarles entrar te hagan algo.",
    "en":"I introduce myself, I'm Erdiran, the boss, I needed someone to take care of whether or not to let clients in, I trust you \n We have to be careful with the wine reserves and your life, lest they drink it all or by not letting them in they do something to you.",
    "cz":"Představuji se, jsem Erdiran, šéf, potřeboval jsem někoho, kdo by se postaral o to, zda pustit klienty dovnitř, věřím vám \n Musíme být opatrní se zásobami vína a tvým životem, aby to všechno nevypili nebo ti něco neudělali, když je nepustíme dovnitř.",
    "nl":"Ik stel mezelf voor, ik ben Erdiran, de baas, ik had iemand nodig die ervoor zorgde of ik klanten wel of niet binnenliet, ik vertrouw je \n We moeten voorzichtig zijn met de wijnreserves en met uw leven, zodat ze niet alles opdrinken of door ze niet binnen te laten, ze u iets aandoen."
}
const textStartH3 = {
    "es":"Si quieres ayudarme firma el contrato",
    "en":"If you want to help me sign the contract",
    "cz":"Pokud mi chcete pomoci podepiste smlouvu",
    "nl":"Als je me wilt helpen het contract te ondertekenen"
}
const signButton = {
    "es":"Firmar",
    "en":"Sign",
    "cz":"Podepsat",
    "nl":"Teken"
}

// nombre, body, face, mensaje, dineroTaberna, textoResultadoEntrar
const personajes = [
    {
        "nombre":"Ardrin", 
        "body":"./PNG/Dark_Elves/Character1_face4.png", 
        "face":"./PNG/Dark_Elves_faces/Character1_face4.png", 
        "mensaje":{
            "es":"Hola soy Ardrin vengo de tierra lejanas, me encanta el vino elfico.",
            "en":"Hello, I'm Ardrin, I come from a distant land, I love elven wine.",
            "cz":"Dobrý den, jsem Ardrin, pocházím z daleké země, miluji elfí víno.",
            "nl":"Hallo, ik ben Ardrin, ik kom uit een ver land, ik hou van elfenwijn."
        }, 
        "dineroTaberna":200, 
        "textoJefeEntrar":{
            "es":"Se lo ha pasado en grande con la musica de bardos de fondo",
            "en":"He had a great time with the bardic music in the background",
            "cz":"Skvěle se bavil s bardskou hudbou v pozadí",
            "nl":"Hij heeft zich prima vermaakt met de bardische muziek op de achtergrond"
        }, 
        "mensajeRechazar":{
            "es":"Ardrin Se fue enfadado, no sin antes, atacarte. ",
            "en":"Ardrin left angrily, but not before attacking you.",
            "cz":"Ardrin naštvaně odešel, ale předtím, na tebe zaútočí.",
            "nl":"Ardrin vertrok boos, maar niet voordat hij jou aanviel."
        }, 
        "vidaRes":2, 
        "vinos":5
    },
    {
        "nombre":"Shulima" , 
        "body":"./PNG/Dark_Elves/Character2_face4.png", 
        "face":"./PNG/Dark_Elves_faces/Character2_face4.png", 
        "mensaje":{
            "es":"No estoy acostumbrada a que me pidan informacion al entrar",
            "en":"I'm not used to being asked for information upon entering.",
            "cz":"Nejsem zvykla na to, aby mě při vstupu požadovali informace.",
            "nl":"Ik ben niet gewend dat er bij binnenkomst om informatie wordt gevraagd."
        }, 
        "dineroTaberna":100, 
        "textoJefeEntrar":{
            "es":"Shulima cenó tranquilamente mientras leia su libro",
            "en":"Shulima ate dinner quietly while reading her book.",
            "cz":"Shulima při čtení své knihy tiše večeřela.",
            "nl":"Shulima at rustig haar avondeten terwijl ze haar boek las."
        }, 
        "mensajeRechazar":{
            "es":"Te hizo desaparecer los pantalones y se marchó riendo fuertemente",
            "en":"He made your pants disappear and left laughing loudly",
            "cz":"Nechal ti zmizet kalhoty a odešel s hlasitým smíchem",
            "nl":'Hij liet je broek verdwijnen en ging luid lachend weg'
        },
        "vidaRes":1 ,
        "vinos":4
    },
    {
        "nombre":"Morrok" , 
        "body":"./PNG/Dark_Elves/Character3_face1.png", 
        "face":"./PNG/Dark_Elves_faces/Character3_face1.png", 
        "mensaje":{
            "es":"Buenos dias, venía a ver a un amigo y disfrutar con un vinito",
            "en":"Good morning, I came to see a friend and enjoy a little wine",
            "cz":"Dobré ráno, přišel jsem za kamarádem a vychutnat si trochu vína",
            "nl":"Goedemorgen, ik kwam een ​​vriend bezoeken en genieten van een beetje wijn"
        }, 
        "dineroTaberna":-150, 
        "textoJefeEntrar":{
            "es":"Este malandrín nos ha robado",
            "en":"This miscreant has robbed us",
            "cz":"Tento darebák nás okradl",
            "nl":'Deze onverlaat heeft ons beroofd'
        }, 
        "mensajeRechazar":{
            "es":"Echaste a Morrok",
            "en":"You kicked out Morrok",
            "cz":"Vykopli jste Morroka",
            "nl":"Je hebt Morrok eruit geschopt"
        }, 
        "vidaRes":0,
        "vinos":10
    },
    {
        "nombre":"Wilrym" , 
        "body":"./PNG/Dark_Elves/Character4_face1.png", 
        "face":"./PNG/Dark_Elves_faces/Character4_face1.png", 
        "mensaje":{
            "es":"Soy Wilrym venia a descansar de un largo viaje",
            "en":"I'm Wilrym, I came to rest after a long trip.",
            "cz":"Jsem Wilrym, přišel jsem si odpočinout po dlouhé cestě.",
            "nl":"Ik ben Wilrym, ik kwam tot rust na een lange reis."
        }, 
        "dineroTaberna":300, 
        "textoJefeEntrar":{
            "es":"Este mago ha conjurado una jugosa propina.",
            "en":"This magician has conjured up a juicy tip.",
            "cz":"Tento kouzelník vykouzlil šťavnatý tip.",
            "nl":"Deze goochelaar heeft een sappige tip tevoorschijn getoverd."
        }, 
        "mensajeRechazar":{
            "es":"Ha conjurado un lobo que te ha mordido el pie.",
            "en":"He has conjured a wolf that has bitten your foot.",
            "cz":"Vykouzlil vlka, který ti kousl nohu.",
            "nl":"Hij heeft een wolf tevoorschijn getoverd die je voet heeft gebeten."
        }, 
        "vidaRes":1,
        "vinos":-5
    },
    {
        "nombre":"Hipor" , 
        "body":"./PNG/Dark_Elves/Character5_face2.png", 
        "face":"./PNG/Dark_Elves_faces/Character5_face4.png", 
        "mensaje":{
            "es":"Hola Criatura soy Hipor el legendario, dejame entrar o te asesinare",
            "en":"Hello Creature, I am Hippor the legendary, let me enter or I will murder you.",
            "cz":"Ahoj stvoření, jsem Hippor legendární, nech mě vstoupit, nebo tě zabiju.",
            "nl":"Hallo wezen, ik ben Hippor de legendarische, laat me binnenkomen of ik vermoord je."
        }, 
        "dineroTaberna":-200, 
        "textoJefeEntrar":{
            "es":"Ha consumido 4 comidas y no quiere pagar",
            "en":"He has consumed 4 meals and does not want to pay",
            "cz":"Snědl 4 jídla a nechce platit",
            "nl":"Hij heeft 4 maaltijden genuttigd en wil niet betalen"
        }, 
        "mensajeRechazar":{
            "es":"Los guardias al oir el ruido se lo llevaron al calabozo",
            "en":"When the guards heard the noise, they took him to the dungeon.",
            "cz":"Když stráže uslyšely hluk, odvedli ho do kobky.",
            "nl":"Toen de bewakers het geluid hoorden, namen ze hem mee naar de kerker."
        }, 
        "vidaRes":0,
        "vinos":8
    },
    {
        "nombre":"Karina" , 
        "body":"./PNG/Dark_Elves/Character6_face1.png", 
        "face":"./PNG/Dark_Elves_faces/Character6_face4.png", 
        "mensaje":{
            "es":"Soy Karina, noble elfica, quiero entrar en esta famosa posada",
            "en":"I am Karina, elven noble, I want to enter this famous inn.",
            "cz":"Jsem Karina, elfí vznešená, chci vstoupit do tohoto slavného hostince.",
            "nl":"Ik ben Karina, een nobele elf, ik wil deze beroemde herberg binnengaan."
        }, 
        "dineroTaberna":300, 
        "textoJefeEntrar":{
            "es":"Una clienta super agradable y educada.",
            "en":"A super nice and polite client.",
            "cz":"Super milý a zdvořilý klient.",
            "nl":"Een super aardige en beleefde klant."
        }, 
        "mensajeRechazar":{
            "es":"Tu taberna ya no sera visitada por personas del barrio rico.",
            "en":"Your tavern will no longer be visited by people from the rich neighborhood.",
            "cz":"Vaši krčmu už nebudou navštěvovat lidé z bohaté čtvrti.",
            "nl":"Je taverne wordt niet meer bezocht door mensen uit de rijke buurt."
        }, 
        "vidaRes":0,
        "vinos":5
    },
    {
        "nombre":"Irina", 
        "body":"./PNG/Dark_Elves/Character7_face4.png", 
        "face":"./PNG/Dark_Elves_faces/Character7_face4.png", 
        "mensaje":{
            "es":"Vaya día mas duro de guardia, quiero tomar esa cerveza de trigo.",
            "en":"What a tough day on duty, I want to drink that wheat beer.",
            "cz":"Jaký těžký den ve službě, chci pít to pšeničné pivo.",
            "nl":"Wat een zware dienstdag, ik wil dat witbier drinken."
        }, 
        "dineroTaberna":75, 
        "textoJefeEntrar":{
            "es":"Se ha tomado varias cervezas de trigo mientras escuchaba la musica de los bardos",
            "en":"She had several wheat beers while listening to the music of the bards",
            "cz":"Dala si několik pšeničných piv a poslouchala hudbu bardů",
            "nl":"Ze heeft verschillende witbieren gedronken terwijl ze naar de muziek van de barden luisterde"
        }, 
        "mensajeRechazar":{
            "es":"Irina no entiende por que no la dejas entrar y se marcha un poco triste.",
            "en":"Irina doesn't understand why you don't let her in and leaves a little sad.",
            "cz":"Irina nechápe, proč ji nepustíš dovnitř a odchází trochu smutná.",
            "nl":"Irina begrijpt niet waarom je haar niet binnenlaat en vertrekt een beetje verdrietig."
        }, 
        "vidaRes":0,
        "vinos":5
    },
    {
        "nombre":"Gemma" , 
        "body":"./PNG/Dark_Elves/Character8_face1.png", 
        "face":"./PNG/Dark_Elves_faces/Character8_face1.png", 
        "mensaje":{
            "es":"Por fin una taberna abierta, necesito descansar mis agotados huesos",
            "en":"Finally a tavern open, I need to rest my tired bones",
            "cz":"Konečně otevřena hospoda, potřebuji si odpočinout unavené kosti",
            "nl":"Eindelijk een taverne open, ik moet mijn vermoeide botten laten rusten"
        },
        "dineroTaberna":-1000, 
        "textoJefeEntrar":{
            "es":"Ha robado gran parte de los ornamentos de la taberna",
            "en":"She has stolen much of the tavern's ornaments",
            "cz":"Ukradla spoustu ozdob hospody",
            "nl":"Ze heeft veel van de ornamenten van de herberg gestolen"
        }, 
        "mensajeRechazar":{
            "es":"Se marcha diciendo que eres una mala persona, además uno de sus cuchillo serpiente te persigue por toda la ciudad ",
            "en":"She leaves saying that you are a bad person, and one of her snake knives follows you all over the city.",
            "cz":"Odejde s tím, že jsi špatný člověk, a jeden z jejích hadích nožů tě pronásleduje po celém městě.",
            "nl":"Ze vertrekt en zegt dat je een slecht mens bent, en een van haar slangenmessen volgt je door de hele stad."
        },
        "vidaRes":1,
        "vinos":15},
    {
        "nombre":"Mirak" , 
        "body":"./PNG/Demon_warriors/Character3_face1.png", 
        "face":"./PNG/Demon_warriors_faces/Character3_face4.png", 
        "mensaje":{
            "es":"Tengo que ver a un amigo, además traigo un encargo para tu jefe.",
            "en":"I have to see a friend, and I also have an order for your boss.",
            "cz":"Musím vidět přítele a také mám objednávku pro vašeho šéfa.",
            "nl":"Ik moet naar een vriend, en ik heb ook een bestelling voor je baas."
        }, 
        "dineroTaberna":400, 
        "textoJefeEntrar":{
            "es":"Ha traido varias botellas de vino elfico y comprado un venado",
            "en":"He brought several bottles of elven wine and bought a deer.",
            "cz":"Přinesl několik lahví elfského vína a koupil jelena.",
            "nl":"Hij bracht verschillende flessen elfenwijn mee en kocht een hert."
        },
        "mensajeRechazar":{
            "es":"Te ha orinado en los zapatos",
            "en":"He peed on your shoes",
            "cz":"Počůral ti boty",
            "nl":"Hij heeft op je schoenen geplast"
        }, 
        "vidaRes":0,
        "vinos":-10
    },
    {
        "nombre":"Sagrath" , 
        "body":"./PNG/Demon_warriors/Character5_face1.png", 
        "face":"./PNG/Demon_warriors_faces/Character5_face1.png", 
        "mensaje":{
            "es":"Hola mortal, abreme paso o te volvere ceniza",
            "en":"Hello mortal, make way for me or I will turn you to ash.",
            "cz":"Ahoj smrtelníku, uvolni mi cestu, nebo tě proměním v popel.",
            "nl":"Hallo sterveling, maak plaats voor mij, anders verander ik je in as."
        }, 
        "dineroTaberna":0, 
        "textoJefeEntrar":{
            "es":"Ha venido a llevarse a un cliente al infierno." ,
            "en":"He has come to take a client to hell.",
            "cz":"Přišel, aby vzal klienta do pekla.",
            "nl":"Hij is gekomen om een ​​cliënt naar de hel te brengen."
        }, 
        "mensajeRechazar":{
            "es":"Te convierte en ceniza el brazo derecho",
            "en":"It turns your right arm into ashes",
            "cz":"Promění tvou pravou ruku v popel",
            "nl":"Het verandert je rechterarm in as"
        }, 
        "vidaRes":5,
        "vinos":0
    },
    {
        "nombre":"Sir Dremon" ,
        "body":"./PNG/Demon_warriors/Character6_face1.png", 
        "face":"./PNG/Demon_warriors_faces/Character6_face1.png", 
        "mensaje":{
            "es":"Por fin un sitio donde tienen Vino elfico",
            "en":"Finally a place where they have elven wine",
            "cz":"Konečně místo, kde mají elfí víno",
            "nl":"Eindelijk een plek waar ze elfenwijn hebben"
        }, 
        "dineroTaberna":1000, 
        "textoJefeEntrar":{
            "es":"Parece ser que los demonios beben mucho, ten cuidado con las reservas. ",
            "en":"It seems that demons drink a lot, be careful with reserves.",
            "cz":"Zdá se, že démoni hodně pijí, buďte opatrní s rezervami.",
            "nl":"Het lijkt erop dat demonen veel drinken, wees voorzichtig met reserves."
        }, 
        "mensajeRechazar":{
            "es":"Te muerde y te convierte en Zombi",
            "en":"He bites you and turns you into a Zombie",
            "cz":"Kousne tě a promění tě v zombie",
            "nl":"Het bijt je en verandert je in een zombie"
        }, 
        "vidaRes":2,
        "vinos":10
    },
    {
        "nombre":"Ignira" , 
        "body":"./PNG/Demon_warriors/Character7_face1.png", 
        "face":"./PNG/Demon_warriors_faces/Character7_face1.png", 
        "mensaje":{
            "es":"No te preocupes mortal, no usare mi magia dentro",
            "en":"Don't worry mortal, I won't use my magic inside.",
            "cz":"Neboj se smrtelníku, nepoužiji svou magii uvnitř.",
            "nl":"Maak je geen zorgen, sterveling, ik zal mijn magie vanbinnen niet gebruiken."
        }, 
        "dineroTaberna":-500, 
        "textoJefeEntrar":{
            "es":"Ha quemado la un barril de vino elfico",
            "en":"He has burned a barrel of elven wine",
            "cz":"Spálil sud elfského vína",
            "nl":"Hij heeft een vat elfenwijn verbrand"
        }, 
        "mensajeRechazar":{
            "es":"Que miedo teneis los mortales",
            "en":"How afraid are you mortals",
            "cz":"Jak se bojíte vy smrtelníci",
            "nl":"Wat zijn jullie stervelingen bang"
        }, 
        "vidaRes":0,
        "vinos":10
    },
    {
        "nombre":"Zelvion" , 
        "body":"./PNG/Demon_warriors/Character8_face1.png", 
        "face":"./PNG/Demon_warriors_faces/Character8_face4.png", 
        "mensaje":{
            "es":"No hay nada mejor que un buen trago despues de trabajar",
            "en":"There is nothing better than a good drink after work",
            "cz":"Není nic lepšího než dobrý drink po práci",
            "nl":"Er is niets beter dan een lekker drankje na het werk"
        }, 
        "dineroTaberna":1000, 
        "textoJefeEntrar":{
            "es":"Ha disfrutado toda la noche mirando el fondo del vaso de forma melancólica.",
            "en":"He has enjoyed the whole night looking at the bottom of the glass melancholy",
            "cz":"Celou noc si užíval melancholického pohledu na dno sklenice.",
            "nl":"Hij heeft de hele nacht genoten van het kijken naar de onderkant van het glas."
        }, 
        "mensajeRechazar":{
            "es":"Te intenta partir con el hacha del enfado",
            "en":"He tries to split you with the ax of anger",
            "cz":"Snaží se tě rozdělit sekerou vzteku",
            "nl":"Hij probeert je te splijten met de bijl van woede"
        }, 
        "vidaRes":1,
        "vinos":20
    },
    {
        "nombre":"Sir Elwin" , 
        "body":"./PNG/Halflings2/Character2_face1.png", 
        "face":"./PNG/Halflings2_faces/Character2_face1.png", 
        "mensaje":{
            "es":"Vengo de las tierras de Grindarin, se habla bien allí de esta taberna",
            "en":"I come from the lands of Grindarin, this tavern is well spoken of there",
            "cz":"Pocházím ze zemí Grindarin, o této krčmě se tam dobře mluví",
            "nl":"Ik kom uit de landen van Grindarin, er wordt daar veel over deze taverne gesproken",
        }, 
        "dineroTaberna":400, 
        "textoJefeEntrar":{
            "es":"Los elfos son muy tranquilos",
            "en":"Elves are very calm",
            "cz":"Elfové jsou velmi klidní",
            "nl":"Elfen zijn erg kalm"
        }, 
        "mensajeRechazar":{
            "es":"Vaya desgracia no poder entrar.",
            "en":"What a shame not to be able to enter.",
            "cz":"Jaká škoda, že nemůžu vstoupit.",
            "nl":"Wat jammer dat je er niet naar binnen kunt gaan."
        }, 
        "vidaRes":0,
        "vinos":4
    },
    {
        "nombre":"Ermir" , 
        "body":"./PNG/Halflings2/Character3_face1.png", 
        "face":"./PNG/Halflings2_faces/Character3_face1.png", 
        "mensaje":{
            "es":"Me han desterrado de mi reino, vengo a ahogar mis penas.",
            "en":"I have been banished from my kingdom, I come to drown my sorrows.",
            "cz":"Byl jsem vyhnán ze svého království, přicházím utopit své smutky.",
            "nl":"Ik ben verbannen uit mijn koninkrijk, ik kom mijn verdriet verdrinken."
        }, 
        "dineroTaberna":2000, 
        "textoJefeEntrar":{
            "es":"Es el mismisimo rey Erwin, ha habido un golpe de estado en su reino.",
            "en":"It's King Erwin himself, there has been a coup in his kingdom.",
            "cz":"Je to sám král Erwin, v jeho království došlo k převratu.",
            "nl":"Het is koning Erwin zelf, er heeft een staatsgreep plaatsgevonden in zijn koninkrijk."
        }, 
        "mensajeRechazar":{
            "es":"Tras unas horas Erwin es asesinado por unos mercenarios.",
            "en":"After a few hours Erwin is murdered by some mercenaries.",
            "cz":"Po několika hodinách je Erwin zavražděn nějakými žoldáky.",
            "nl":"Na een paar uur wordt Erwin vermoord door enkele huurlingen."
        }, 
        "vidaRes":0,
        "vinos":30
    },
    {
        "nombre":"Berona" , 
        "body":"./PNG/Halflings2/Character4_face1.png", 
        "face":"./PNG/Halflings2_faces/Character4_face1.png", 
        "mensaje":{
            "es":"Buenas amigo, traigo panes frescos.",
            "en":"Hello friend, I bring fresh bread.",
            "cz":"Ahoj příteli, přináším čerstvý chléb.",
            "nl":"Hallo vriend, ik breng vers brood mee."
        }, 
        "dineroTaberna":-50, 
        "textoJefeEntrar":{
            "es":"Por fin unos buenos panes, no nos quedaban, además te da uno y te cura.",
            "en":"Finally some good bread, we didn't have any left, plus he gives you one and heals you.",
            "cz":"Konečně dobrý chleba, už nám nezbyl, navíc ti jeden dá a uzdraví tě.",
            "nl":"Eindelijk wat lekker brood, we hadden niets meer, en hij geeft je er één en geneest je."
        }, 
        "mensajeRechazar":{
            "es":"Tus clientes estan hambrientos y quieren pan fresco.",
            "en":"Your customers are hungry and want fresh bread.",
            "cz":"Vaši zákazníci mají hlad a chtějí čerstvý chléb.",
            "nl":"Uw klanten hebben honger en willen vers brood."
        }, 
        "vidaRes":-3,
        "vinos":0
    },
    {
        "nombre":"Florindia" ,
        "body":"./PNG/Halflings2/Character5_face1.png", 
        "face":"./PNG/Halflings2_faces/Character5_face1.png", 
        "mensaje":{
            "es":"Me preguntaba si algun cliente querría algunas ropajes nuevos, no sin antes comprar una buena ensalada con nueces.",
            "en":"I was wondering if any customers would like some new clothes, but not before buying a nice salad with walnuts.",
            "cz":"Zajímalo by mě, jestli by někteří zákazníci chtěli nějaké nové oblečení, ale ne předtím, než si koupí pěkný salát s vlašskými ořechy.",
            "nl":"Ik vroeg me af of er klanten zijn die nieuwe kleren willen, maar niet voordat ze een lekkere salade met walnoten hebben gekocht."
        }, 
        "dineroTaberna":20,
        "textoJefeEntrar":{
            "es":"Vaya clienta más particular.",
            "en":"What a very particular client.",
            "cz":"Jaký velmi konkrétní klient.",
            "nl":"Wat een bijzondere klant."
        }, 
        "mensajeRechazar":{
            "es":"Se va a otra tienda a vender sus ropajes",
            "en":"He goes to another store to sell his clothes",
            "cz":"Jede do jiného obchodu prodat své oblečení",
            "nl":"Hij gaat naar een andere winkel om zijn kleding te verkopen"
        }, 
        "vidaRes":0,
        "vinos":0
    },
    {
        "nombre":"Dandromi" , 
        "body":"./PNG/Halflings2/Character6_face1.png", 
        "face":"./PNG/Halflings2_faces/Character6_face1.png", 
        "mensaje":{
            "es":"Vengo a hacer alquimia mientras me relajo con buen vino elfico",
            "en":"I come to do alchemy while I relax with good elven wine.",
            "cz":"Přišel jsem dělat alchymii, zatímco si odpočinu u dobrého elfího vína.",
            "nl":"Ik kom alchemie doen terwijl ik ontspan met goede elfenwijn."
        }, 
        "dineroTaberna":200, 
        "textoJefeEntrar":{
            "es": "Tenía miedo de la alquimia, pero es tranquilo.",
            "en":"I was afraid of alchemy, but it's calm.",
            "cz":"Bál jsem se alchymie, ale je klid.",
            "nl":"Ik was bang voor alchemie, maar het is kalm."
        }, 
        "mensajeRechazar":{
            "es":"Te lanza una pocíon de envejecimiento.",
            "en":"Throws an aging potion at you.",
            "cz":"Hází po tobě stárnoucí lektvar.",
            "nl":"Gooit een verouderingsdrankje naar je."
        }, 
        "vidaRes":1,
        "vinos":2
    },
    {
        "nombre":"Mredan" , 
        "body":"./PNG/Halflings2/Character7_face1.png", 
        "face":"./PNG/Halflings2_faces/Character7_face1.png", 
        "mensaje":{
            "es":"Espero que se acepten mascotas.",
            "en":"I hope pets are accepted.",
            "cz":"Doufám, že jsou akceptována domácí zvířata.",
            "nl":"Ik hoop dat huisdieren worden geaccepteerd."
        }, 
        "dineroTaberna":200, 
        "textoJefeEntrar":{
            "es": "Tanto el perro como Mredan se lo han pasado genial en la taberna con el venado y el vino elfico.",
            "en":"Both the dog and Mredan had a great time in the tavern with the venison and the elven wine.",
            "cz":"Pes i Mredan se skvěle bavili v krčmě se zvěřinou a elfím vínem.",
            "nl":"Zowel de hond als Mredan hadden een geweldige tijd in de herberg met het hert en de elfenwijn."
        }, 
        "mensajeRechazar":{
            "es":"El perro te mira triste y se van.",
            "en":"The dog looks at you sad and they leave.",
            "cz":"Pes se na tebe smutně podívá a odejdou.",
            "nl":"De hond kijkt je verdrietig aan en ze vertrekken."
        }, 
        "vidaRes":0,
        "vinos":5
    },
    {
        "nombre":"Sir Rolland" , 
        "body":"./PNG/Halflings2/Character8_face1.png", 
        "face":"./PNG/Halflings2_faces/Character8_face1.png", 
        "mensaje":{
            "es":"No me juzgues por mi tamaño, bebo más que la mayoria de demonios",
            "en":"Don't judge me by my size, I drink more than most demons.",
            "cz":"Nesuď mě podle mé velikosti, piju víc než většina démonů.",
            "nl":"Beoordeel me niet op mijn maat, ik drink meer dan de meeste demonen"
        }, 
        "dineroTaberna":1000, 
        "textoJefeEntrar":{
            "es":"Se ha bebido dos barriles de vino elfico",
            "en":"He has drunk two barrels of elven wine",
            "cz":"Vypil dva sudy elfského vína",
            "nl":"Hij heeft twee vaten elfenwijn gedronken"
        },
        "mensajeRechazar":{
            "es":"Se marcha enfadado y te lanza un conjuro que te provoca mudez.",
            "en":"He leaves angry and casts a spell on you that makes you mute.",
            "cz":"Odchází naštvaný a sešle na tebe kouzlo, které tě umlčí.",
            "nl":"Hij vertrekt boos en spreekt een spreuk over je uit waardoor je stom wordt."
        }, 
        "vidaRes":2,
        "vinos":20
    },
    {
        "nombre":"", 
        "body": "", 
        "face":"", 
        "mensaje":{
            "es":"Nadie mas por el dia de hoy",
            "en":"No one else today",
            "cz":"Dnes nikdo jiný",
            "nl":"Niemand anders vandaag"
        }, 
        "dineroTaberna":0, 
        "textoJefeEntrar": "", 
        "mensajeRechazar":"", 
        "vidaRes":0,
        "vinos":0,
        "pasarTiempo" :""
    }
]
