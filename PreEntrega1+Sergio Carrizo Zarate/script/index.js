// Función para calcular la nota final de un alumno
function calcularNotaFinal(nota1, nota2, nota3) {
    let notaFinal = (nota1 + nota2 + nota3) / 3;
    return notaFinal;
}

// Función para determinar si el alumno esta aprobado o desaprobado 
function determinarCondicion(notaFinal) {
    if (notaFinal >= 6) {
        return "Aprobado";
    } else {
        return "Desaprobado";
    }
}

// Función para ingresar las notas de un alumno y obtener la nota final y su condición
function ingresarNotasYCalcular() {
    let nota1 = parseFloat(prompt("Ingrese la nota 1, del 0 al 10:"));
    let nota2 = parseFloat(prompt("Ingrese la nota 2, del 0 al 10:"));
    let nota3 = parseFloat(prompt("Ingrese la nota 3, del 0 al 10:"));

    let notaFinal = calcularNotaFinal(nota1, nota2, nota3);
    let condicion = determinarCondicion(notaFinal);

    console.log(`La nota final del alumno es: ${notaFinal.toFixed(2)}`);
    console.log(`La Condición del alumno es: ${condicion}`);
}

// Función para mostrar la información del alumno
function calcularVariasNotas() {
    let cantidadAlumnos = parseInt(prompt("Ingrese la cantidad de alumnos:"));

    for (let i = 0; i < cantidadAlumnos; i++) {
        console.log(`Alumno ${i + 1}:`);
        ingresarNotasYCalcular();
    }
}

calcularVariasNotas();
