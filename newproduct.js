var urlBase = 'https://api.yumserver.com/16752/products';

// Función para obtener la fecha actual en formato YYYY-MM-DD
function obtenerFechaActual() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

// Función para establecer la fecha actual en el campo de fecha
function establecerFechaActual() {
    var fechaActual = obtenerFechaActual();
    document.getElementById('fecha').value = fechaActual;
    document.getElementById('fecha').min = fechaActual;
}

// Evento que se dispara cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    establecerFechaActual();
});

// Evento click del botón guardar
document.getElementById('btnguardar').addEventListener('click', function() {
    let producto = {
        titulo: document.getElementById('titulo').value,
        precioPeso: document.getElementById('pesos').value,
        precioDolar: document.getElementById('dolar').value,
        fecha: document.getElementById('fecha').value,
    };
    
    // Solicitar a la API cargar los datos del nuevo producto
    fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    })
    .then(response => response.text())
    .then(function(texto) {
        if (texto.trim() === "OK") {
            alert('Se creó el producto con éxito.');
            window.location.href = 'viewproduct.html'; 
        } else {
            alert(texto);
        }
    })
    .catch(error => console.error('Error:', error));
});
