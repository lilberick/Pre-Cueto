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
/*function verificarRespuesta(pregunta, solucion, mensajeID){
	var respuesta=document.querySelector('input[name="'+pregunta+'"]:checked').value;
	var mensaje="";
	if(respuesta==solucion){mensaje="¡Correcto!";}
	else{mensaje="Incorrecto";}
	document.getElementById(mensajeID).innerHTML = mensaje;
}*/
function verificarRespuesta(solucion, mensajeID){
	var mensaje="";
	var alternativa= document.querySelector('input[name="respuesta"]:checked').value;
	if(alternativa==solucion){mensaje="¡Correcto!";}
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
//Cambiar problema
function CambiarProblema(){
  // Generar números aleatorios
  var num1 = Math.floor(Math.random() * 10) + 1;
  var num2 = Math.floor(Math.random() * 10) + 1;
  // Generar operador aleatorio
  var operador = Math.random() < 0.5 ? '+' : '-';
  // Calcular resultado
  var resultado = operador == '+' ? num1 + num2 : num1 - num2;
  // Actualizar HTML con el problema generado
  document.getElementById('cambiarProblema').innerHTML = num1 + ' ' + operador + ' ' + num2 + ' = ' + resultado;
}
/*function cargarProblemas(){
	const archivo = new h5web.File('mi_archivo.h5', 'r');
	const dataset = archivo.dataset('mi_dataset');
	const data = dataset.read();
	const enunciado = data[0][0];
	const respuesta_correcta = data[0][1];
	const opciones = data[0].slice(2);
	const problemaDiv = document.getElementById('problema');
	problemaDiv.innerHTML = `
  <div class="pregunta">${enunciado}</div>
  <form>
    <div class="respuesta"><input type="radio" name="respuesta" value="a"><label>${respuesta_correcta}</label></div>
    <div class="respuesta"><input type="radio" name="respuesta" value="b"><label>${opciones[0]}</label></div>
    <div class="respuesta"><input type="radio" name="respuesta" value="c"><label>${opciones[1]}</label></div>
    <div class="respuesta"><input type="radio" name="respuesta" value="d"><label>${opciones[2]}</label></div>
    <input type="button" id="boton" value="Verificar" onclick="verificarRespuesta('respuesta', '${respuesta_correcta}', 'mensaje')">
  </form>
`;
}*/
function cargarProblemas(){
  fetch('problemas.csv') // Cambia "problemas.csv" por la ruta a tu archivo CSV
    .then(response => response.text())
    .then(data => {
      //const problemas = data.split('\n').map(row => row.split('","'));
	  const problemas = data.split('\n').map(row => row.split('","').map(val => val.replace(/"/g, '')));
      const problemaAleatorio = problemas[Math.floor(Math.random() * problemas.length)];
      const [enunciado, respuesta,o1,o2,o3,o4,o5] = problemaAleatorio;
      const problemaDiv = document.getElementById('problema');
      problemaDiv.innerHTML = `
	  	<p id="timer">Tiempo transcurrido: 00:00:00</p>
        <div class="pregunta" id="enunciado">${enunciado}</div>
		<div class="retroalimentacion" id="mensaje"></div>
        <form>
          <div class="respuesta"><input type="radio" name="respuesta" value=${o1}><label>${o1}</label></div>
          <div class="respuesta"><input type="radio" name="respuesta" value=${o2}><label>${o2}</label></div>
          <div class="respuesta"><input type="radio" name="respuesta" value=${o3}><label>${o3}</label></div>
          <div class="respuesta"><input type="radio" name="respuesta" value=${o4}><label>${o4}</label></div>
          <div class="respuesta"><input type="radio" name="respuesta" value=${o5}><label>${o5}</label></div>
          <input type="button" id="boton" value="Verificar" onclick="verificarRespuesta('${respuesta}','mensaje')">
		  <input type="button" id="cron" value="Cronometro" onclick="cronometro('cron','timer')">
        </form>
      `;
      MathJax.typeset([document.getElementById('enunciado')]);
    });
}
