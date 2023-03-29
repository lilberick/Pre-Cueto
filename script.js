//Cronometro
let startTime,timerInterval;
let respuestaCorrecta;
let clicks = 0;
function startTimer(ntimer){
  startTime=Date.now();
  timerInterval = setInterval(function() { updateTimer(ntimer); }, 10);
}
function updateTimer(ntimer){
  let elapsedTime=Date.now()-startTime;
  document.getElementById(ntimer).innerHTML="Tiempo transcurrido: "+new Date(elapsedTime).toISOString().substr(11,8);
}
function stopTimer(){
  clearInterval(timerInterval);
}
function cronometro(cronometro,ntimer){
  clicks++;
  switch(clicks){
    case 1:
      startTimer(ntimer);
	  document.getElementById(cronometro).value = "Detener";
      break;
    case 2:
      stopTimer();
	  document.getElementById(cronometro).value = "Reiniciar";
      break;
    case 3:
      clicks = 0;
      document.getElementById(ntimer).innerHTML = "Tiempo transcurrido: 00:00:00";
	  document.getElementById(cronometro).value = "Iniciar";
      break;
  }
}
//Verifica si la respuesta es correcta
function verificarRespuesta(pregunta, solucion, mensajeID){
	var respuesta=document.querySelector('input[name="'+pregunta+'"]:checked').value;
	var mensaje="";
	if(respuesta==solucion){mensaje="¡Correcto!";}
	else{mensaje="Incorrecto";}
	document.getElementById(mensajeID).innerHTML = mensaje;
}
//Mostrar, ocultar silabo
const silabos = document.querySelectorAll('.silabo');
silabos.forEach((silabo) => {
	silabo.addEventListener('click', () => {
		silabo.classList.toggle('active');
	});
});
