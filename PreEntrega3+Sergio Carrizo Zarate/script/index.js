document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('alumnoForm');
    const resultadosDiv = document.getElementById('resultados');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // se obtienen los valores ingresados por el usuario
        const nombre = document.getElementById('nombre').value;
        const nota1 = parseFloat(document.getElementById('nota1').value);
        const nota2 = parseFloat(document.getElementById('nota2').value);
        const nota3 = parseFloat(document.getElementById('nota3').value);

        // Cálculo de la nota final y la condición
        const { notaFinal, condicion } = calcularNotaYCondicion({ nota1, nota2, nota3 });

        // Creación del objeto alumno
        const alumno = { nombre, notaFinal, condicion };

        guardarAlumno(alumno);

        mostrarResultados();
    });

 
    mostrarResultados();
});

// Función para calcular la nota final y la condición de un alumno
const calcularNotaYCondicion = ({ nota1, nota2, nota3 }) => {
    const notaFinal = ((nota1 + nota2 + nota3) / 3).toFixed(2);
    const condicion = notaFinal >= 6 ? "Aprobado" : "Desaprobado";
    return { notaFinal, condicion };
};

const guardarAlumno = (alumno) => {
    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    
    // Agregar el alumno nuevo
    alumnos.push(alumno);
    
    // Guarda el array actualizado en el almacenamiento local
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
};

// Función para mostrar los resultados de todos los alumnos
const mostrarResultados = () => {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';

    // Recuperar los alumnos del almacenamiento local
    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    // Iterar sobre cada alumno y crear elementos HTML para mostrar sus datos
    alumnos.forEach((alumno, index) => {
        const alumnoDiv = document.createElement('div');
        alumnoDiv.innerHTML = `
            <h2>Alumno ${index + 1}</h2>
            <p>Nombre: ${alumno.nombre}</p>
            <p>Nota Final: ${alumno.notaFinal}</p>
            <p>Condición: ${alumno.condicion}</p>
        `;
        resultadosDiv.appendChild(alumnoDiv);
    });
};
