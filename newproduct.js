var urlBase = 'https://api.yumserver.com/16752/products';

//FUNCION PARA QUE LA FECHA HABILITADA A SELECCIONAR SEA LA ACTUAL.
document.addEventListener("DOMContentLoaded", function() {
    var fechaActual = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').value = fechaActual;
    document.getElementById('fecha').min = fechaActual;
})

document.getElementById('btnguardar').addEventListener('click', function() {
    let producto = {
        titulo: document.getElementById('titulo').value,
        precioPeso: document.getElementById('pesos').value,
        precioDolar: document.getElementById('dolar').value,
        fecha: document.getElementById('fecha').value,
    };
    //SOLICITO A LA API CARGAR LOS DATOS DEL NUEVO PRODUCTO.
    fetch(urlBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    })
    .then(response => response.text())
    .then(
        function(texto){
            if(texto.trim() == "OK"){
                alert('Se creo el producto con exito.');
                window.location.href = 'index.html'; 
            }else{
                alert(texto);
            }
        }
    )
    .catch(error => console.error('Error:', error));
})
