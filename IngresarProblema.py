import re
def agregar_pregunta():
    pregunta = input("Escribe tu pregunta:\n")
    respuesta_correcta = input("Escribe la letra que corresponde a la respuesta [a,e]:")

    with open("CuatroOperaciones.html", "r") as archivo_html:
        contenido_html = archivo_html.read()

    nuevo_numero = int(re.findall(r"Pregunta (\d+)", contenido_html)[-1]) + 1
    alternativas = '\n\t'.join(f'<div class="respuesta"><input type="radio" name="respuesta{nuevo_numero}" value="{letra}" id="{letra}"><label for="{letra}">{alternativa}</label></div>' for letra, alternativa in zip(['a', 'b', 'c', 'd', 'e'], [input(f"Ingresa alternativa {letra}:") for letra in ['a', 'b', 'c', 'd', 'e']]))
    comentario = f'<!--Pregunta {nuevo_numero}-->'
    nueva_pregunta = f'<div class="pregunta">{pregunta}</div>'
    retroalimentacion = f'<div class="retroalimentacion" id="mensaje{nuevo_numero}"></div>'
    verifica_respuesta = f'<input type="button" id="boton{nuevo_numero}" value="Enviar respuesta" onclick="verificarRespuesta(\'respuesta{nuevo_numero}\',\'{respuesta_correcta}\',\'mensaje{nuevo_numero}\')">'

    nuevo_html = contenido_html.replace("</body>", f"\t{comentario}\n\t{nueva_pregunta}\n\t{retroalimentacion}\n\t<form>\n\t{alternativas}\n\t{verifica_respuesta}\n\t</form>\n</body>")
    with open("index.html", "w") as archivo_html:
        archivo_html.write(nuevo_html)

    return nuevo_html
agregar_pregunta()
