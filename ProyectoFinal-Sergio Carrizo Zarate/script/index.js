document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('alumnoForm');
    const resultadosDiv = document.getElementById('resultados');
    const buscador = document.getElementById('buscador');

    await cargarAlumnosDesdeAPI();
    mostrarResultados();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const nota1 = parseFloat(document.getElementById('nota1').value);
        const nota2 = parseFloat(document.getElementById('nota2').value);
        const nota3 = parseFloat(document.getElementById('nota3').value);

        const { notaFinal, condicion } = calcularNotaYCondicion({ nota1, nota2, nota3 });
        const alumno = { nombre, notaFinal, condicion };

        if (!alumnoExiste(alumno.nombre)) {
            await guardarAlumno(alumno);
            mostrarResultados();
            swal("Éxito", "Alumno agregado correctamente", "success");
        } else {
            swal("Error", "El alumno ya existe.", "error");
        }
    });

    buscador.addEventListener('input', mostrarResultados);
});

const cargarAlumnosDesdeAPI = async () => {
    try {
        const alumnos = await fetchAlumnos();
        alumnos.forEach(alumno => {
            if (!alumnoExiste(alumno.nombre)) {
                guardarAlumno(alumno);
            }
        });
    } catch (error) {
        console.error('Error al cargar alumnos:', error);
    }
};

const calcularNotaYCondicion = ({ nota1, nota2, nota3 }) => {
    const notaFinal = ((nota1 + nota2 + nota3) / 3).toFixed(2);
    const condicion = notaFinal >= 6 ? "Aprobado" : "Desaprobado";
    return { notaFinal, condicion };
};

const guardarAlumno = async (alumno) => {
    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    alumnos.push(alumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
};

const alumnoExiste = (nombre) => {
    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    return alumnos.some(alumno => alumno.nombre === nombre);
};

const mostrarResultados = () => {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';

    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    const buscador = document.getElementById('buscador').value.toLowerCase();

    const alumnosFiltrados = alumnos.filter(alumno => 
        alumno.nombre.toLowerCase().includes(buscador)
    );

    alumnosFiltrados.forEach((alumno, index) => {
        const alumnoDiv = document.createElement('div');
        alumnoDiv.innerHTML = `
            <h2>Alumno ${index + 1}</h2>
            <p>Nombre: ${alumno.nombre}</p>
            <p>Nota Final: ${alumno.notaFinal}</p>
            <p>Condición: ${alumno.condicion}</p>
            <button class="btn btn-danger btn-sm" onclick="eliminarAlumno('${alumno.nombre}')">Borrar Alumno</button>
        `;
        resultadosDiv.appendChild(alumnoDiv);
    });
};

const eliminarAlumno = (nombre) => {
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    alumnos = alumnos.filter(alumno => alumno.nombre !== nombre);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    mostrarResultados();
    swal("Eliminado", "Alumno eliminado correctamente", "success");
};

const fetchAlumnos = async () => {
    const response = await fetch('./data/alumnos.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
