// Función para calcular la nota final de un alumno
function calcularNotaFinal(nota1, nota2, nota3) {
    let notaFinal = (nota1 + nota2 + nota3) / 3;
    return notaFinal;
}

// Función para determinar si el alumno está aprobado o desaprobado
function determinarCondicion(notaFinal) {
    return notaFinal >= 6 ? "Aprobado" : "Desaprobado";
}

// Función para ingresar las notas de un alumno y obtener la nota final y su condición
function ingresarNotasYCalcular() {
    let nota1 = parseFloat(prompt("Ingrese la nota 1, del 0 al 10:"));
    let nota2 = parseFloat(prompt("Ingrese la nota 2, del 0 al 10:"));
    let nota3 = parseFloat(prompt("Ingrese la nota 3, del 0 al 10:"));

    let notaFinal = calcularNotaFinal(nota1, nota2, nota3);
    let condicion = determinarCondicion(notaFinal);

    return {
        notaFinal: notaFinal.toFixed(2),
        condicion: condicion
    };
}

// Función para mostrar la información del alumno
function calcularVariasNotas() {
    let cantidadAlumnos = parseInt(prompt("Ingrese la cantidad de alumnos:"));
    let alumnos = []; // Se implemento un Array para almacenar información de cada alumno

    for (let i = 0; i < cantidadAlumnos; i++) {
        let nombre = prompt(`Ingrese el nombre del alumno ${i + 1}:`);
        // Se solicita que el usuario le de nombre al alumno y se lo llama a ingresarNotasYCalcular
        let resultados = ingresarNotasYCalcular();

        // Se crea un objeto con la información del o los alumnos y se agrega al array de alumnos
        let alumno = {
            nombre: nombre,
            notaFinal: resultados.notaFinal,
            condicion: resultados.condicion
        };
        alumnos.push(alumno);
    }

    // Se llama a la función mostrarResultados para mostrar los resultados de todos los alumnos
    mostrarResultados(alumnos);
}

// Función para mostrar los resultados de todos los alumnos
function mostrarResultados(alumnos) {
    alumnos.forEach((alumno, index) => {
        console.log(`Alumno ${index + 1}:`);
        console.log(`Nombre: ${alumno.nombre}`);
        console.log(`Nota Final: ${alumno.notaFinal}`);
        console.log(`Condición: ${alumno.condicion}`);
        // Se muestra un alert con los resultados de cada alumno
        alert(`Alumno ${index + 1}:\nNombre: ${alumno.nombre}\nNota Final: ${alumno.notaFinal}\nCondición: ${alumno.condicion}`);
    });
}

calcularVariasNotas();
