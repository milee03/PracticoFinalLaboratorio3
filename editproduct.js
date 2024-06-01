var urlBase = 'https://api.yumserver.com/16752/products';
// OBTENGO EL ID DEL PRODUCTO QUE QUIERO EDITAR. VENGO CON ESE PARAMETRO DESDE VIEWPRODUCT.
const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get('id');


//FUNCIÓN PARA QUE EL SELECTOR DE FECHA SE HABILITE DESDE LA FECHA ACTUAL.
document.addEventListener("DOMContentLoaded", function() {
  var fechaActual = new Date().toISOString().split('T')[0];
  document.getElementById('fecha').value = fechaActual;
  document.getElementById('fecha').min = fechaActual;
})

document.getElementById('btnguardar').addEventListener('click', function() {
    const id = idProducto;
    const nuevoTitulo = document.getElementById('titulo').value;
  //CONVERTIR FECHA EN AÑO-MES-DIA"
    const fechaInput = document.getElementById('fecha').value;
    const fechaPartes = fechaInput.split('-'); 
    const anio = fechaPartes[0]; 
    const mes = fechaPartes[1]; 
    const dia = fechaPartes[2]; 
    const nuevaFecha = `${anio}-${mes}-${dia}`;
    const nuevoPesos = document.getElementById('pesos').value;
    const nuevoDolar = document.getElementById('dolar').value;

 //ARMO EL OBJETO CON DATOS ACTUALIZADOS.
    const datosActualizados = {
    idcod : id,
    titulo: nuevoTitulo, 
    precioPeso: nuevoPesos,
    precioDolar: nuevoDolar,
    fecha: nuevaFecha
    };
  //VERIFICAR QUE SE COMPLETEN TODOS LOS DATOS
    if (nuevoTitulo === '' || fechaInput === '' || nuevoPesos === '' || nuevoDolar === '') {
    alert('Debes completar todos los datos del producto.');
    return;
    }

  //ENVIO LA SOLICITUD A LA API PARA MODIFICAR.
    fetch(urlBase, {
       method: 'PATCH',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(datosActualizados)
    })
    .then(response => {
    console.log(datosActualizados)
    if (!response.ok) {
    throw new Error('Error al actualizar el producto');
    }
      alert('Producto actualizado exitosamente');
      window.location.href = 'viewproduct.html'; 
    })
    .catch(error => {
    console.error('Error al actualizar el producto:', error);
    });
})

document.getElementById('btnvolver').addEventListener('click', function() {
window.location.href = 'viewproduct.html'; 
})