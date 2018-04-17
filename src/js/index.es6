let elems = {
  cartones: document.querySelectorAll(".carton .numeros"),
  bola_bingo: document.querySelector(".bola"),
  centro: document.querySelector(".centro")
};

let numeros = _.shuffle(_.range(1, 91));
let carton = {cpu: [], jugador: []};

function sacarNumero(){
  let numeroBola = numeros.shift(); //Elimina y saca el primer numero.
  elems.bola_bingo.textContent = String(numeroBola);
  comprobarNumero(numeroBola);
  comprobarGanador();
}

function comprobarNumero(numeroBola){
  if(carton.cpu.includes(numeroBola) || carton.jugador.includes(numeroBola)){
    let indiceCpu = carton.cpu.indexOf(numeroBola);
    let indiceJug = carton.jugador.indexOf(numeroBola);

    let numeroTacharCpu = document.querySelector(`.cpu .n${indiceCpu}`);
    let numeroTacharJug = document.querySelector(`.jugador .n${indiceJug}`);

    if(numeroTacharCpu != undefined){
      numeroTacharCpu.classList.add("tachado");
    }
    if(numeroTacharJug != undefined){
      numeroTacharJug.classList.add("tachado");
    }
  }
}

function comprobarGanador(){
  let contador = 0;
  carton.cpu.forEach(function(e, i){
    let numeroCpu = document.querySelector(`.cpu .n${i}`);
    if(numeroCpu.classList.contains("tachado")){
      contador++;
    }
  });
  if (contador==15){
    ganador("CPU");
  }else{
    contador = 0;
    carton.jugador.forEach(function(e, i){
      let numeroJugador = document.querySelector(`.jugador .n${i}`);
      if(numeroJugador.classList.contains("tachado")){
        contador++;
      }
    });
    if (contador==15){
      ganador("Jugador");
  }
  }
}

function ganador(ganador){
  let div = document.createElement("div");
  div.classList.add("textoCarton");
  div.textContent = `Gana ${ganador}`;
  elems.centro.appendChild(div);

}




function nuevoCarton(){
  let numeros_carton = _.shuffle(numeros).slice(0,15);
  return numeros_carton;
}

function crearCartones(){
    for(let i in _.range(1, 16)){
      let numeroJ = document.createElement("div");
      let numeroC = document.createElement("div");

      numeroJ.className = `numero n${i}`;
      numeroC.className = `numero n${i}`;

      numeroJ.textContent = carton.jugador[i];
      numeroC.textContent = carton.cpu[i];

      elems.cartones[0].appendChild(numeroJ);
      elems.cartones[1].appendChild(numeroC);
    }
}



carton.cpu = nuevoCarton();
carton.jugador = nuevoCarton();

crearCartones();
