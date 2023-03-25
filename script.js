function verificarRespuesta(pregunta, solucion, mensajeID){
	var respuesta=document.querySelector('input[name="'+pregunta+'"]:checked').value;
	var mensaje="";
	if(respuesta==solucion){
		mensaje="¡Correcto!";
		document.body.style.backgroundImage = "url('imagenes/correcto.png')";
	}
	else{
		mensaje="Incorrecto. La respuesta correcta es: "+solucion;
		document.body.style.backgroundImage = "url('imagenes/incorrecto.png')";
	}
	document.getElementById(mensajeID).innerHTML=mensaje;
}
const silabos = document.querySelectorAll('.silabo');
silabos.forEach((silabo) => {
	silabo.addEventListener('click', () => {
		silabo.classList.toggle('active');
	});
});

